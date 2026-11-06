# CTRL-TECH — Règles métier de référence

Ce document est la source de vérité métier. Toute règle qui protège les données, les stocks, les prix ou les droits doit être appliquée côté API et, lorsque possible, renforcée par PostgreSQL. L'interface peut améliorer l'expérience, mais ne constitue jamais une frontière de sécurité.

## 1. Catalogue

- Un produit est créé avec le statut `draft`.
- Seuls les produits `published` sont exposés par l'API publique.
- Un produit `archived` n'est plus commercialisable.
- Un produit publiable doit avoir au moins une variante active, un SKU unique et un prix valide.
- Une variante appartient à un seul produit. Son SKU est unique dans tout le catalogue.
- Les montants sont stockés en `numeric(12,2)`, jamais en nombres flottants côté serveur.
- Une image principale est facultative ; lorsqu'elle existe, elle doit appartenir au produit concerné.
- Les catégories inactives ne doivent pas être proposées dans les nouveaux produits.

## 2. Prix et disponibilité

- Les prix actuellement présents dans le catalogue de démonstration sont indicatifs : ils ne valent pas offre ferme.
- Le serveur est la seule source de vérité pour le prix. Une future commande transmet des identifiants de variantes et des quantités, jamais un prix faisant autorité depuis le navigateur.
- Avant confirmation d'une commande, l'API relit le prix et la disponibilité en base.
- Toute évolution de prix doit être historisée avant l'activation du checkout.

## 3. Inventaire

- `quantity_on_hand` représente la quantité physiquement détenue.
- `quantity_reserved` représente la quantité affectée à des commandes non finalisées.
- Disponible = `quantity_on_hand - quantity_reserved`.
- Invariants : quantités entières positives ou nulles et quantité réservée inférieure ou égale au stock physique.
- Une réservation et sa vérification doivent être atomiques en base (transaction/verrouillage ou mise à jour conditionnelle).
- Une réservation expirée ou une commande annulée libère exactement les quantités qui lui sont associées.
- Chaque réception, vente, réservation, libération, correction ou retour crée un mouvement d'inventaire traçable avec acteur, date et motif.
- Une correction manuelle exige un rôle autorisé et un motif obligatoire.

## 4. Identité et autorisations

Rôles prévus : `customer`, `operator`, `catalog_manager`, `admin`, `super_admin`.

- Le client ne peut consulter que son profil et ses commandes.
- L'opérateur traite les commandes, sans modifier les paramètres de sécurité.
- Le gestionnaire catalogue gère produits, variantes, images et inventaire selon les permissions attribuées.
- L'administrateur gère les opérations et les comptes internes.
- Le super administrateur gère les privilèges critiques.
- Un rôle envoyé dans le corps HTTP, un paramètre URL ou un état React n'est jamais une preuve d'autorisation.
- Les rôles privilégiés sont attribués depuis une action serveur autorisée et vérifiés sur chaque route privée.
- Tant que la vérification du jeton Clerk côté serveur n'est pas configurée, aucune route d'écriture ou d'administration ne doit être exposée.

## 5. Commandes — périmètre futur

Statuts envisagés : `pending`, `awaiting_payment`, `paid`, `preparing`, `ready`, `completed`, `cancelled`, `refunded`.

- Une commande conserve un instantané du nom, SKU, prix unitaire, devise et quantité au moment de sa création.
- Le client ne choisit ni le total calculé ni le statut de paiement.
- Le total est recalculé côté serveur à partir des prix relus en base.
- Les transitions de statut sont contrôlées par une machine à états côté serveur.
- Le paiement n'est marqué confirmé qu'après vérification serveur d'une preuve ou d'un webhook signé du prestataire.
- Une commande annulée libère ses réservations une seule fois.
- Les opérations de création et de confirmation doivent être idempotentes.

## 6. Livraison et retrait

- Les zones, frais, délais et modalités doivent être validés par CTRL-TECH avant activation.
- Une commande ne devient `completed` qu'après confirmation de remise ou de livraison par un rôle autorisé.
- Les coordonnées du client ne sont visibles que par les rôles qui en ont besoin pour traiter la commande.

## 7. Sécurité, fiabilité et données

- Valider toutes les entrées avec un schéma côté serveur.
- Ne jamais exposer `DATABASE_URL`, `CLERK_SECRET_KEY` ou d'autres secrets dans le bundle Vite.
- Limiter taille, pagination et filtres des endpoints publics.
- Ne pas retourner de détails SQL, de stack trace ou de secrets dans les réponses HTTP.
- Journaliser les actions sensibles sans enregistrer de jetons, mots de passe ou données de paiement sensibles.
- Utiliser des migrations versionnées ; ne pas modifier manuellement le schéma de production.
- Prévoir tests des règles, des permissions, des transitions et des scénarios concurrents avant activation commerciale.

## 8. Périmètre de la première livraison backend

La première livraison couvre uniquement la connexion serveur à Neon, le contrôle de santé et la lecture du catalogue publié. Les écritures catalogue, le stock transactionnel, Clerk/RBAC, les commandes, le paiement et la livraison restent désactivés jusqu'à configuration et validation métier.

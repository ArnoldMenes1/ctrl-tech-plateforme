# Passation frontend → backend — CTRL-TECH

## Objectif

Cette branche livre les écrans frontend nécessaires pour que l'équipe backend puisse connecter les parcours métier sans devoir inventer l'UX. Les pages d'administration sont des prototypes visuels : elles ne constituent pas une autorisation d'accès.

## État réel

- Boutique publique existante : accueil, catalogue, fiche produit, panier local.
- Interfaces ajoutées : checkout, espace client, commandes, suivi, assistance/FAQ, conditions de vente, livraison/retrait, confidentialité.
- Back-office ajouté en prototype : tableau de bord, produits, commandes, stocks, clients/accès et paramètres.
- Les données affichées dans les écrans client et admin sont fictives.
- Aucun formulaire de commande n'envoie de requête ; aucun paiement, mouvement de stock ou changement d'état n'est exécuté.
- Le seul endpoint métier actuellement livré est le catalogue public `GET /api/products`.

## Routes frontend à connecter

| Route | Écran | API / service attendu |
|---|---|---|
| `/` | Accueil | Catalogue public + produits mis en avant |
| `/catalogue` | Recherche, catégories, tri | `GET /api/products?q=&category=&featured=&limit=&offset=` |
| `/produit/:id` | Détail produit | `GET /api/products?id=<uuid>` |
| `/panier` | Panier local | À migrer vers un panier persistant si compte connecté |
| `/commande` | Coordonnées, réception, paiement | Création de commande à implémenter après validation métier |
| `/compte` | Espace client | Clerk + profil client |
| `/compte/commandes` | Historique | Liste des commandes du client connecté |
| `/compte/commandes/:id` | Suivi | Détail + historique de statut, propriétaire vérifié côté serveur |
| `/aide` | FAQ | Contenu éditorial |
| `/conditions` | Conditions de vente | Contenu validé par CTRL-TECH |
| `/livraison-retours` | Livraison / retrait | Zones, frais, délais et politique validés |
| `/confidentialite` | Confidentialité | Politique de données validée |
| `/admin` | Dashboard | API admin + agrégats autorisés |
| `/admin/produits` | Gestion catalogue | CRUD produits, marques, catégories, variantes, médias |
| `/admin/commandes` | Traitement commandes | Liste, détail et transitions de statut |
| `/admin/stocks` | Inventaire | Quantités, seuils, mouvements et alertes |
| `/admin/clients` | Comptes et accès | Utilisateurs internes, rôles et permissions |
| `/admin/parametres` | Configuration | Paramètres commerciaux, livraison, paiements et notifications |

## Contrat catalogue déjà implémenté

`GET /api/products` accepte :
- `id` : UUID produit facultatif ;
- `q` : recherche texte ;
- `category` : nom de catégorie ;
- `featured` : `true` / `false` ;
- `limit` : 1 à 50, défaut 24 ;
- `offset` : 0 à 10 000, défaut 0.

Réponse : `{ data: ProductRow[], pagination: { limit, offset, total, hasMore } }`.
L'endpoint ne retourne que les produits publiés et les variantes actives. Les erreurs attendues sont 400 (filtres invalides), 405 (méthode interdite), 503 (configuration DB absente) et 500 (erreur interne).

Le frontend normalise ces lignes dans `src/catalog-api.ts`. Conserver cet adaptateur ou faire évoluer son type en même temps que le contrat serveur.

## API à proposer / implémenter

Ces routes sont des propositions d'intégration et ne sont pas encore présentes dans le dépôt :

### Client
- `GET /api/me` — profil du membre authentifié.
- `GET /api/me/orders?limit=&offset=` — commandes du membre courant uniquement.
- `GET /api/me/orders/:orderId` — détail et timeline, avec contrôle de propriété.
- `POST /api/orders` — valider prix, devise, disponibilité, réception et coordonnées ; créer la commande de façon atomique.
- `GET /api/store-settings/public` — coordonnées et informations commerciales publiables.

### Administration
- `GET/POST /api/admin/products`
- `PATCH/DELETE /api/admin/products/:id`
- `GET/POST /api/admin/orders`
- `PATCH /api/admin/orders/:id/status`
- `GET /api/admin/inventory`
- `POST /api/admin/inventory/movements`
- `GET/POST /api/admin/users` et gestion des rôles selon les permissions
- `GET /api/admin/metrics`
- `GET/PATCH /api/admin/settings`

Chaque endpoint admin doit vérifier la session Clerk et le rôle/permission côté serveur. Masquer un lien ou protéger une route React ne constitue pas une sécurité.

## Points de sécurité et de métier bloquants

1. Vérifier le token/session Clerk dans chaque endpoint privé ; ne jamais se fier à un rôle envoyé par le navigateur.
2. Définir RBAC (ex. super_admin, catalog_manager, order_manager, inventory_manager, support) avec permissions minimales.
3. Restreindre les données client à leur propriétaire ; journaliser les accès et actions sensibles.
4. Recalculer les prix côté serveur au checkout. Ne jamais faire confiance aux prix, quantités ou totaux venant du frontend.
5. Réserver/décrémenter le stock dans une transaction atomique avec idempotence de création de commande.
6. Définir les statuts de commande et les transitions autorisées avant de rendre les boutons d'action actifs.
7. Ne pas activer de paiement avant choix du prestataire, vérification des webhooks et rapprochement.
8. Confirmer prix, devise, disponibilité, garanties, retours, livraison, retrait et contacts officiels.
9. Configurer des environnements Neon distincts pour Preview et Production ; ne pas exposer `DATABASE_URL` dans le navigateur.
10. Remplacer les jeux de données fictifs par des données API uniquement après validation des autorisations.

## Critères d'acceptation de la passation

- Les écrans utilisent des réponses API documentées et typées.
- Les états loading / empty / error / success sont définis pour les listes et détails.
- Les formulaires affichent les erreurs de validation serveur et empêchent les doubles soumissions.
- Les rôles sont testés au niveau API (autorisé, interdit, non authentifié).
- Les commandes et stocks sont testés sur concurrence, retries et idempotence.
- Les tests E2E couvrent catalogue → panier → demande de commande → suivi.
- Les données fictives et mentions « démonstration » sont retirées uniquement quand les API et règles métier sont validées.

## Environnement de travail

Branche : `feat/complete-frontend-interfaces`  
PR : https://github.com/ArnoldMenes1/ctrl-tech-plateforme/pull/4  
Base : `feat/storefront-commerce-hardening`  
Aucun merge vers `main` n'a été effectué.

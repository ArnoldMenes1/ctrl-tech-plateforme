# CTRL-TECH — Screen Specification v1.0

> Statut : **architecture des écrans documentée**. Les choix de navigation, de parcours et de structure ci-dessous sont les décisions retenues pour guider les wireframes puis le développement. Les règles commerciales encore inconnues restent explicitement à confirmer.

## 1. Contexte produit

CTRL-TECH est une boutique spécialisée dans les appareils électroniques neufs, avenue Maniema à Lubumbashi, RDC. Le catalogue de référence couvre smartphones, tablettes, ordinateurs portables et accessoires, avec des prix présentés en USD. Le document catalogue est une base de travail et ne confirme ni le stock actuel ni les prix définitifs.

### Positionnement UX

- Direction visuelle : **Precision Retail**.
- Ton : premium, éditorial, technique et accessible.
- Publics : étudiants, professionnels, entreprises, créateurs et passionnés.
- Objectifs : découvrir, rechercher, comparer, comprendre, commander et suivre.
- Le back-office doit permettre une gestion opérationnelle réelle, pas seulement afficher des données décoratives.

## 2. Décisions validées

| Sujet | Décision | Conséquence |
|---|---|---|
| Accueil | Éditorial | Grande composition visuelle, hiérarchie typographique et sections sélectionnées |
| Navigation | Hybride | Accès par catégories et par marques |
| Commande | Compte obligatoire | Authentification requise avant finalisation |
| Comparateur | Oui | Jusqu'à 3 produits comparables |
| Compte client | Obligatoire | Historique et suivi rattachés à un compte |
| Back-office | Sidebar | Navigation latérale persistante sur desktop, adaptée au mobile |

### Règle d'authentification et de continuité
Si un visiteur ajoute des produits au panier puis doit se connecter, le panier doit être conservé. Après authentification, il revient au parcours interrompu. La connexion ne doit pas effacer le panier.

## 3. Architecture de navigation

### 3.1 Boutique publique

- Accueil
- Catalogue général
- Catégories et sous-catégories
- Marques
- Fiche produit
- Comparateur
- Panier
- Inscription / connexion / récupération de compte
- Checkout
- Confirmation de commande
- Suivi de commande
- Compte client
- À propos
- Contact
- Livraison et retrait
- Garantie et retours
- Conditions de vente
- Confidentialité
- FAQ (si contenu confirmé)
- Pages 404 et erreurs

### 3.2 Back-office

- Dashboard
- Catalogue / Produits
- Marques
- Catégories
- Médias
- Inventaire
- Commandes
- Clients
- Promotions
- Rapports
- Équipe et permissions
- Paramètres du magasin
- Journal d'activité

Les menus et actions visibles sont filtrés par permissions, mais la sécurité est toujours appliquée côté serveur.

## 4. Navigation globale de la boutique

### Header desktop
1. Logo CTRL-TECH, retour à l'accueil.
2. Navigation catégories.
3. Entrée « Marques » ouvrant un menu organisé par familles.
4. Recherche.
5. Compte.
6. Panier et compteur.

Le header peut devenir compact au défilement, sans provoquer de saut de mise en page.

### Header mobile
- Logo.
- Recherche accessible.
- Panier.
- Menu compact.
- Catégories et marques dans une navigation mobile claire.
- Zones tactiles confortables.

### Menu marques
N'afficher que les marques ayant au moins un produit publié et consultable. Les marques citées dans le catalogue de travail incluent notamment Apple, Samsung, Proline, ASUS, Lenovo, Dell, HP, Sony, Logitech et Anker. La liste active dépendra des références validées.

## 5. Spécification des écrans publics

## P01 — Accueil éditorial

### Objectif
Installer immédiatement l'identité CTRL-TECH, présenter les univers produits et conduire vers le catalogue ou une sélection.

### Ordre des sections
1. Header global.
2. Hero éditorial : titre, texte bref, CTA catalogue, CTA marques et visuel produit.
3. Bandeau de réassurance : uniquement des engagements confirmés.
4. Univers produits : smartphones, tablettes, ordinateurs, accessoires.
5. Sélection CTRL-TECH administrable.
6. Focus marque ou gamme.
7. Nouveautés publiées.
8. Sélection professionnelle / performance.
9. Accessoires complémentaires.
10. Présentation du magasin.
11. Contact et informations pratiques.
12. Footer.

### Composition du hero
- Desktop : texte à gauche, visuel dominant à droite ; composition asymétrique et espace négatif.
- Mobile : texte puis visuel, CTA empilés ou pleine largeur.
- Contenu éditorial proposé : « La technologie qui accompagne vos ambitions. »
- Texte d'accompagnement : « Découvrez une sélection d'appareils électroniques conçus pour travailler, créer et aller plus loin. »
- CTA : « Explorer le catalogue » et « Découvrir nos marques ».

### Données et comportements
- Les sélections sont gérées depuis le back-office.
- N'afficher que les produits publiés.
- Masquer une section sans contenu plutôt que montrer des blocs vides.
- Les stocks et prix affichés viennent des données validées.
- Les produits indisponibles ne doivent pas être présentés comme immédiatement achetables.

### Mobile
- Hero vertical.
- Catégories en rangée défilante si nécessaire.
- Grille produit 2 colonnes uniquement si les cartes restent lisibles ; sinon 1 colonne.
- Footer réorganisé en accordéons si cela améliore la lisibilité.

## P02 — Catalogue général

### Objectif
Permettre de retrouver rapidement un produit dans l'ensemble du catalogue publié.

### Structure
1. Fil d'Ariane.
2. Titre et introduction.
3. Recherche.
4. Nombre de résultats.
5. Filtres.
6. Tri.
7. Grille de produits.
8. Pagination ou chargement progressif.

### Filtres
- Catégorie et sous-catégorie.
- Marque.
- Fourchette de prix.
- Disponibilité.
- Attributs techniques selon la famille.

Les filtres techniques sont contextuels : RAM, processeur, stockage et GPU pour ordinateur ; capacité, taille d'écran et gamme pour smartphone ou tablette.

### Tri
- Pertinence.
- Nouveautés.
- Prix croissant.
- Prix décroissant.
- Nom.

### Carte produit
- Image principale.
- Marque ou catégorie si utile.
- Nom.
- Configuration courte.
- Prix et devise.
- Disponibilité réelle.
- Accès à la fiche.
- Action ajouter au comparateur.
- Ajout au panier si le produit est achetable.

### États
- Chargement par skeleton.
- Résultats.
- Aucun résultat avec action pour réinitialiser les filtres.
- Erreur avec nouvelle tentative.
- Produit indisponible clairement identifié et sans action d'achat.

### Responsive
- Desktop : filtres latéraux et grille 3–4 colonnes selon largeur.
- Mobile : filtres dans un panneau coulissant, tri accessible, grille 1–2 colonnes.

## P03 — Pages catégories et sous-catégories

### Objectif
Présenter un univers cohérent et des filtres adaptés à la famille.

### Structure
1. Fil d'Ariane.
2. Titre et introduction éditoriale.
3. Sous-catégories ou familles.
4. Marques actives.
5. Sélection de produits.
6. Filtres spécifiques.
7. Grille catalogue.
8. Contenu d'aide ou guide d'achat si disponible.

### Exemples
- Ordinateurs : bureautique, professionnel, création, gaming ; filtres CPU, RAM, stockage, GPU, taille écran.
- Smartphones : Apple iPhone, Samsung Galaxy ; filtres génération, stockage, écran, gamme.
- Tablettes : marque, taille d'écran, stockage, connectivité.
- Accessoires : audio, montres, stockage, chargeurs, hubs et périphériques.

Ne pas afficher une sous-catégorie ou une marque sans produits publiés, sauf choix éditorial explicite.

## P04 — Fiche produit

### Objectif
Fournir toutes les informations nécessaires à une décision d'achat fiable.

### Zone principale desktop
- Colonne média : environ 58 %.
- Colonne informations/achat : environ 42 %.
- Mobile : galerie puis informations et actions.

### Galerie
- Image principale.
- Miniatures.
- Zoom ou affichage grand format.
- Ordre des médias administrable.
- Texte alternatif pertinent.

### Informations et achat
1. Marque.
2. Nom.
3. Référence/SKU si pertinent.
4. Description courte.
5. Prix et devise.
6. Prix précédent uniquement si promotion vérifiée.
7. Sélection de variante/configuration.
8. Disponibilité.
9. Quantité limitée par le stock vendable.
10. Ajouter au panier.
11. Ajouter au comparateur.
12. Garantie uniquement selon les conditions validées.

### Sections secondaires
- Présentation.
- Caractéristiques techniques structurées.
- Livraison/retrait.
- Garantie.
- Produits associés ou accessoires compatibles.

### Règles
- Une variante possède sa propre référence, configuration et disponibilité si applicable.
- Ne jamais laisser sélectionner une variante inexistante.
- Les prix et stocks sont revalidés côté serveur avant la commande.
- Les attributs sont structurés en base pour les filtres et le comparateur ; une description libre ne suffit pas.

## P05 — Comparateur

### Objectif
Comparer jusqu'à trois produits de la même famille.

### Structure
- Titre.
- Emplacements de sélection (maximum 3).
- Recherche d'un produit à ajouter.
- Tableau de comparaison.
- Mise en évidence des différences.
- Liens vers les fiches produits.

### Règles
- Refuser ou empêcher la comparaison de familles incompatibles.
- N'afficher que les attributs pertinents pour la catégorie.
- Signaler les caractéristiques non renseignées sans inventer de valeur.
- Desktop : colonnes côte à côte.
- Mobile : tableau horizontal utilisable, avec libellés lisibles.

## P06 — Panier

### Contenu
- Articles et images.
- Nom et variante/configuration.
- Prix unitaire.
- Quantité.
- Suppression.
- Sous-total.
- Frais éventuels uniquement s'ils sont calculables et confirmés.
- Total.
- CTA « Passer commande ».

### Comportements
- Panier conservé entre les visites.
- Panier associé au compte après connexion.
- Revalidation serveur des prix et stocks au checkout.
- Demander l'accord du client si le prix a changé.
- Ajuster ou bloquer une quantité supérieure au stock.
- Le panier ne réserve pas automatiquement les produits.

### États
- Panier vide avec lien vers le catalogue.
- Panier chargé.
- Article devenu indisponible.
- Prix modifié.
- Erreur de synchronisation.

## P07 — Inscription, connexion et récupération de compte

### Inscription
- Nom complet.
- E-mail.
- Téléphone si requis par le parcours de commande.
- Mot de passe si le fournisseur d'identité le gère dans ce flux.
- Acceptation des conditions et politique de confidentialité selon les exigences applicables.

### Connexion
- E-mail.
- Mot de passe ou méthode d'authentification activée.
- Récupération de compte.
- Lien vers inscription.

### Règles
- Authentification obligatoire avant finalisation de commande.
- Redirection de retour vers le panier/checkout après connexion.
- Le panier invité est fusionné ou associé au compte sans doublons.
- Les erreurs d'authentification restent explicites sans divulguer d'informations sensibles.

## P08 — Checkout

### Étape 1 : coordonnées
- Préremplir depuis le profil.
- Autoriser la correction.
- Valider les champs nécessaires.

### Étape 2 : réception
- Livraison ou retrait selon les options réellement proposées.
- Adresse et instructions si livraison.
- Frais et délais uniquement après validation métier.

### Étape 3 : paiement
- Afficher uniquement les méthodes réellement configurées.
- Distinguer instruction de paiement, paiement en attente, confirmé, échoué ou remboursé.
- Ne jamais afficher « payé » sur simple déclaration du client.

### Étape 4 : récapitulatif
- Produits et variantes.
- Quantités.
- Coordonnées.
- Réception.
- Paiement.
- Total.
- Acceptation des conditions.

### Création de commande
- Création côté serveur dans une transaction.
- Instantané des prix, noms, SKU et quantités.
- Contrôle de stock et idempotence.
- Génération d'un identifiant de commande.
- Historisation des statuts.

## P09 — Confirmation

- Message confirmant la réception de la commande.
- Numéro unique.
- Résumé et total.
- Mode de réception.
- Méthode et statut de paiement.
- Instructions de prochaine étape.
- Lien vers détail de commande.

Une commande reçue n'est pas nécessairement payée ou acceptée. Ces statuts doivent être présentés séparément.

## P10 — Suivi de commande

### Informations
- Numéro.
- Date.
- Articles.
- Paiement.
- Mode de réception.
- Statut et historique horodaté.

### Exemple de cycle indicatif
- Reçue.
- À confirmer.
- Confirmée.
- En préparation.
- Prête ou expédiée.
- Terminée.
- Annulée, si applicable.

Les statuts réels seront définis avec les opérations du magasin. Ne pas afficher un suivi d'expédition si aucun transporteur ou processus correspondant n'est configuré.

## P11 — Compte client

### Navigation
- Vue d'ensemble.
- Mes commandes.
- Détail d'une commande.
- Mes informations.
- Mes adresses.
- Sécurité du compte.
- Déconnexion.

### Vue d'ensemble
- Bienvenue.
- Commandes récentes.
- Commandes en cours.
- Raccourcis vers catalogue et profil.

### Sécurité et confidentialité
- Un client ne consulte que ses propres données.
- Toute opération sur une commande vérifie la propriété côté serveur.
- Les données personnelles affichées sont limitées au nécessaire.

## P12 — Pages institutionnelles

- À propos : présentation, positionnement et informations validées.
- Contact : adresse, téléphone, WhatsApp, e-mail et horaires confirmés.
- Livraison/retrait : zones, coûts et délais confirmés.
- Garantie : durée, couverture, exclusions et procédure validées.
- Retours : règles et modalités validées.
- Conditions de vente.
- Confidentialité.
- FAQ si réponses validées.

Ne pas publier de coordonnées, horaires, garanties ou engagements supposés.

## 6. Spécification du back-office

### Shell administratif

- Sidebar graphite persistante sur desktop, largeur cible 256 px.
- Logo et identité CTRL-TECH.
- Navigation groupée.
- Barre supérieure avec titre, recherche, notifications et profil.
- Zone de contenu claire et fluide.
- Sur tablette/mobile : sidebar repliable ou navigation adaptée.
- Chaque entrée et action est conditionnée par les permissions.
- Les endpoints vérifient les permissions côté serveur.

## A01 — Dashboard

### Indicateurs
- Chiffre d'affaires calculé sur les ventes payées.
- Nombre de commandes.
- Panier moyen calculé sur la base définie.
- Produits publiés.
- Stocks faibles.
- Ruptures.

### Sections
- Sélecteur de période.
- Graphique de ventes.
- Commandes récentes.
- Produits les plus vendus.
- Alertes de stock.
- Commandes à traiter.

Aucune donnée fictive ne doit être présentée comme réelle. Les états sans données doivent être explicites. Définir précisément les règles de calcul avant de comparer des périodes.

## A02 — Liste des produits

- En-tête, nombre de références et bouton « Ajouter un produit ».
- Recherche par nom/SKU.
- Filtres marque, catégorie, statut et disponibilité.
- Tri et pagination.
- Tableau : image, produit, SKU, marque, prix, stock, statut et actions.
- Actions : ouvrir, modifier, prévisualiser, publier/dépublier, archiver.
- Conserver l'historique des produits associés à des commandes.

## A03 — Création / édition produit

Organiser le formulaire en sections ou onglets :
1. Général : nom, slug, SKU, marque, catégorie, description.
2. Prix : prix, devise, prix de comparaison et promotion validée.
3. Variantes : options, configuration, SKU et prix propres.
4. Spécifications : attributs structurés.
5. Images : image principale, galerie, ordre et alt.
6. Stock : quantités, seuils et emplacement si utilisé.
7. SEO : titre, description et image de partage.

### Règles de validation
- SKU unique.
- Références et variantes cohérentes.
- Image principale avant publication si exigée.
- Champs obligatoires selon catégorie.
- Produit incomplet conservé en brouillon.
- Prix et stock modifiés avec historique.
- Prévisualisation avant publication.

## A04 — Marques et catégories

### Marques
- Nom, logo, description, slug, statut, ordre d'affichage.
- Liste des produits associés.

### Catégories
- Nom, image, description, parent, slug, statut, ordre.
- Hiérarchie et sous-catégories.
- Produits associés.

Ne pas supprimer une catégorie ou marque référencée sans stratégie de réaffectation ou d'archivage.

## A05 — Médias

- Bibliothèque des images.
- Upload et validation de type/taille.
- Aperçu, texte alternatif, ordre et rattachement produit.
- Gestion des images inutilisées.
- Stockage objet/CDN à choisir.
- Les fichiers doivent être contrôlés côté serveur ; ne pas faire confiance au seul type MIME fourni par le navigateur.

## A06 — Inventaire

### Colonnes
- Produit.
- Variante.
- Stock physique.
- Stock réservé.
- Stock disponible.
- Seuil minimum.
- État.

### Actions
- Entrée.
- Sortie.
- Correction.
- Consultation de l'historique.
- Filtre et export autorisé.

Chaque mouvement doit contenir motif, quantité, date, référence associée si applicable et utilisateur. Le stock disponible est calculé selon les règles de réservation validées. Les corrections ne doivent jamais modifier silencieusement le stock.

## A07 — Commandes

### Liste
- Numéro.
- Client.
- Date.
- Total.
- Statut commande.
- Statut paiement.
- Mode de réception.
- Action d'ouverture.

### Détail
- Client et coordonnées nécessaires.
- Articles et instantané de commande.
- Paiement et références.
- Livraison/retrait.
- Historique des statuts.
- Notes internes.
- Actions permises selon rôle et statut.

Les statuts de commande et de paiement sont séparés. Toute transition est validée côté serveur et historisée.

## A08 — Clients

- Recherche.
- Nom, e-mail, téléphone.
- Date d'inscription.
- Nombre de commandes.
- Total des commandes payées selon règle de calcul.
- Fiche client et historique d'achat.

Limiter l'accès aux données personnelles au personnel qui en a besoin.

## A09 — Promotions

- Nom et code éventuel.
- Type de remise : montant ou pourcentage.
- Produits/catégories concernés.
- Dates de validité.
- Limites d'utilisation.
- Règles de cumul.
- Activation/désactivation.
- Historique et résultats.

Ne pas cumuler des réductions sans règle explicite.

## A10 — Équipe et permissions

Rôles initiaux proposés :
- Super administrateur.
- Administrateur.
- Responsable commercial.
- Gestionnaire de stock.
- Gestionnaire catalogue.
- Lecture seule.

Les permissions détaillées seront définies par action et ressource. Les contrôles sont appliqués côté serveur ; masquer un bouton ne constitue pas une protection.

## A11 — Rapports

- Ventes par période.
- Produits les plus vendus.
- Ventes par catégorie et marque.
- Valeur du stock selon méthode définie.
- Mouvements d'inventaire.
- Commandes annulées.
- Répartition des paiements.

Exports CSV/PDF soumis aux permissions. Chaque rapport documente sa période, sa devise et sa méthode de calcul.

## A12 — Paramètres

Rubriques :
1. Informations du magasin.
2. Adresse et coordonnées.
3. Devise et prix.
4. Livraison et retrait.
5. Paiements.
6. Notifications.

Les changements critiques nécessitent confirmation, validation serveur et journalisation.

## A13 — Journal d'activité

Événements à tracer :
- Création/modification/publication d'un produit.
- Modification de prix.
- Entrée, sortie ou correction de stock.
- Changement de statut d'une commande.
- Création/désactivation d'un utilisateur.
- Modification de permissions.
- Changement de paramètres.

Chaque entrée contient acteur, action, ressource, date et métadonnées minimales nécessaires. Éviter d'enregistrer des secrets ou données personnelles excessives.

## 7. États d'interface transversaux

Chaque écran qui dépend de données doit prévoir :
- Chargement : skeleton proche du layout final.
- Succès : données et confirmation.
- Vide : explication et action utile.
- Erreur : message compréhensible et réessai.
- Accès refusé : écran ou message 403.
- Ressource inexistante : 404.
- Réseau indisponible : état dégradé explicite.
- Action en cours : bouton désactivé et indicateur.
- Validation formulaire : erreur associée au champ.

## 8. Responsive

| Largeur indicative | Adaptation |
|---|---|
| < 768 px | Mobile : navigation compacte, contenu empilé, filtres en panneau |
| 768–1023 px | Tablette : navigation adaptée, grilles souvent 2 colonnes |
| 1024–1439 px | Desktop : sidebar et grilles 3 colonnes selon place |
| ≥ 1440 px | Grand écran : contenu centré et grilles jusqu'à 4 colonnes |

Les tableaux complexes peuvent devenir des cartes structurées sur mobile. Éviter le simple écrasement des colonnes.

## 9. Accessibilité et qualité UX

- Cible WCAG 2.2 AA.
- Contraste suffisant et états non communiqués par couleur seule.
- Navigation clavier et focus visible.
- Labels explicites et erreurs associées.
- Images avec textes alternatifs.
- Zones tactiles adaptées.
- Zoom et reflow testés.
- Respect de `prefers-reduced-motion`.
- Tableaux avec en-têtes sémantiques.
- Messages de chargement et notifications accessibles.

## 10. Parcours critiques à tester

### Parcours client — achat
Accueil → catalogue/catégorie → fiche produit → panier → connexion/inscription → réception → paiement → confirmation → suivi.

Critères :
- Le panier survit à l'authentification.
- Le prix et le stock sont revérifiés.
- La commande est créée une seule fois.
- Les états paiement/commande sont distincts.
- Le client n'accède qu'à ses commandes.

### Parcours catalogue — publication
Connexion autorisée → création produit → marque/catégorie → variantes et attributs → médias → prix et stock → prévisualisation → publication.

Critères :
- SKU unique.
- Champs requis validés.
- Produit incomplet non publiable.
- Historique des modifications.

### Parcours opérationnel — commande
Commande reçue → vérification → paiement vérifié → préparation → remise/livraison → clôture.

Critères :
- Transitions permises par le rôle et le statut.
- Chaque changement est historisé.
- Aucun paiement n'est marqué payé sans preuve ou validation autorisée.

## 11. Ordre de réalisation

| Lot | Périmètre | Résultat attendu |
|---|---|---|
| 1 | Shell public, header, footer, navigation | Navigation cohérente responsive |
| 2 | Accueil éditorial | Sections pilotées par données |
| 3 | Catalogue et catégories | Recherche, filtres et tri |
| 4 | Fiche produit | Variantes, prix, médias et disponibilité |
| 5 | Comparateur | Comparaison fiable de 3 produits |
| 6 | Panier et authentification | Panier conservé après connexion |
| 7 | Checkout, confirmation et suivi | Commande de bout en bout |
| 8 | Shell admin et catalogue | Gestion produit complète |
| 9 | Inventaire et commandes | Opérations contrôlées et historisées |
| 10 | Clients, promotions, rapports, paramètres | Gestion opérationnelle |
| 11 | Sécurité, accessibilité, responsive et QA | Parcours critiques validés |

## 12. Décisions métier encore ouvertes

Ces choix ne sont pas déduits de la maquette et ne doivent pas être inventés :

| Sujet | État |
|---|---|
| Moyens de paiement exacts, opérateurs et processus | À confirmer par CTRL-TECH |
| Validation manuelle ou intégration automatisée du paiement | À confirmer |
| Livraison, retrait, zones, frais et délais | À confirmer |
| Règles de stock, réservation et seuils | À confirmer |
| USD uniquement ou affichage CDF complémentaire | À confirmer |
| Français seul ou français/anglais | À confirmer |
| Canaux et coordonnées de support | À confirmer |
| Garantie, retours, exclusions et SAV | À confirmer |
| Horaires et coordonnées commerciales | À confirmer |
| Références, prix et quantités publiables | À valider par le magasin |

## 13. Référence catalogue

Le document « Catalogue Control Tech » fourni sert de base de contenu et décrit :
- Smartphones Apple iPhone et Samsung Galaxy.
- Tablettes Apple iPad et Samsung Galaxy Tab.
- Ordinateurs Proline, ASUS, Lenovo, Dell, HP et MacBook.
- Accessoires audio, montres, stockage, chargeurs et périphériques.
- Prix exprimés en USD dans le document.

Les informations de ce catalogue sont des données de travail. Avant publication, confirmer chaque référence, configuration, prix, disponibilité, garantie et condition de vente.

## 14. Critères de validation de conception

La conception d'un écran est prête pour développement lorsque :
- son objectif et son utilisateur sont définis ;
- son contenu et sa hiérarchie sont documentés ;
- les interactions et destinations sont précisées ;
- les états chargement/vide/erreur/succès sont décrits ;
- les comportements desktop/tablette/mobile sont prévus ;
- les règles d'accès et de sécurité sont identifiées ;
- les données affichées ont une source connue ;
- les décisions métier non résolues sont signalées ;
- les critères d'acceptation sont vérifiables.

## 15. Documents associés

- [Design System Precision Retail](../design/DESIGN-SYSTEM.md)
- [Backlog Scrum](../project-management/BACKLOG-SCRUM.md)
- [README du projet](../../README.md)

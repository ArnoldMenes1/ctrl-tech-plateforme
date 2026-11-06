# CTRL-TECH E-Commerce

Plateforme e-commerce officielle de CTRL-TECH, magasin de produits électroniques neufs situé avenue Maniema à Lubumbashi (RDC).

> **Objectif :** concevoir, développer et exploiter une véritable boutique en ligne, rapide, sécurisée, administrable et adaptée aux habitudes d'achat locales. Le catalogue fourni sert de base métier initiale ; les stocks, prix et garanties devront être confirmés par CTRL-TECH avant publication.

> **Liens :** la Preview d'équipe et l'historique des versions sont documentés ci-dessous.

## Liens de travail — Preview équipe

- **Aperçu public de la branche `feat/storefront-foundation` :** https://ctrl-tech-plateforme-qxxdc2z4k-menesmva-9298s-projects.vercel.app?_vercel_share=wPsjmDsJUI9zG64XqBrApeTZBh0OHye9
- **Historique des déploiements Vercel :** https://vercel.com/menesmva-9298s-projects/ctrl-tech-plateforme/deployments
- **Branche source :** https://github.com/ArnoldMenes1/ctrl-tech-plateforme/tree/feat/storefront-foundation

Le lien Preview utilise un accès partageable Vercel pour contourner la protection SSO de l'environnement Preview. Toute personne qui possède ce lien peut consulter cette version ; partage-le uniquement avec les personnes concernées. Le dépôt GitHub étant privé, l'accès au code reste soumis aux permissions GitHub.

Chaque nouveau commit poussé sur une branche connectée à Vercel crée une nouvelle Preview. Les déploiements restent consultables dans l'historique Vercel et peuvent être ouverts individuellement pour comparer les versions ou revenir à un état antérieur.

---

---

## 1. Vision et objectifs

### Objectifs commerciaux
- Présenter le catalogue CTRL-TECH : smartphones, ordinateurs, tablettes, audio, montres connectées, accessoires et périphériques.
- Permettre la recherche, le filtrage, la comparaison et la consultation détaillée des produits.
- Transformer une visite en commande ou en demande de disponibilité.
- Donner à l'équipe CTRL-TECH un espace d'administration pour gérer produits, catégories, prix, stocks, commandes, promotions et contenu.
- Rassurer le client avec des informations claires sur l'état neuf, la garantie, le paiement, la livraison et le service après-vente.
- Mesurer les performances commerciales et l'expérience utilisateur.

### Principes non négociables
1. Le catalogue public ne doit afficher que des informations validées par CTRL-TECH.
2. Aucun stock, prix, avis, délai de livraison ou moyen de paiement ne doit être inventé.
3. Les secrets et clés privées ne sont jamais exposés au navigateur ni committés dans Git.
4. Toute opération sensible est vérifiée côté serveur.
5. Chaque évolution passe par Git, revue, tests et déploiement Preview avant Production.
6. L'interface doit être mobile-first, accessible et performante sur les connexions mobiles.

## 2. Informations métier de référence

- **Nom commercial :** CTRL-TECH / CONTROL TECH (forme officielle à confirmer).
- **Activité :** vente de produits électroniques neufs.
- **Implantation :** avenue Maniema, Lubumbashi, Haut-Katanga, RDC.
- **Positionnement observé dans le catalogue :** multimarque, moyen-haut de gamme et premium.
- **Familles identifiées :** smartphones, ordinateurs portables, tablettes, audio, montres, accessoires et périphériques.
- **Marques présentes dans le catalogue :** Apple, Samsung, ASUS, Lenovo, Dell, HP, Sony, Logitech, Anker et autres marques citées dans le document fourni.
- **Prix catalogue :** affichés en USD dans le document de référence ; les tarifs réels doivent être confirmés avant publication.
- **Paiements mentionnés dans le catalogue :** espèces et Mobile Money. Les opérateurs, modalités, frais et procédures doivent être confirmés.
- **Garantie :** annoncée dans le catalogue ; durée, couverture, exclusions et procédure restent à documenter.
- **Livraison :** zones, tarifs, délais et modalités à définir avec le magasin.

Le catalogue de travail n'est pas une preuve de stock actuel ni une validation contractuelle des prix. Chaque fiche publiée devra être vérifiée par un responsable CTRL-TECH.

## 3. Architecture technique cible

### Stack retenue

| Couche | Technologie | Responsabilité |
|---|---|---|
| Frontend | React + TypeScript + Vite | Boutique et back-office |
| UI | Tailwind CSS + composants accessibles (Radix UI ou équivalent) | Design system responsive |
| Routage | React Router | Navigation et routes protégées |
| Données serveur | TanStack Query | Cache, mutations et synchronisation API |
| Formulaires | React Hook Form + Zod | Validation cohérente |
| Backend | Vercel Functions, Node.js + TypeScript | API métier et règles serveur |
| Base de données | Neon PostgreSQL | Données transactionnelles |
| ORM / migrations | Drizzle ORM + Drizzle Kit | Schéma typé et migrations versionnées |
| Authentification | Clerk | Connexion, sessions et identité |
| Autorisations | RBAC applicatif côté serveur | Rôles client, opérateur, gestionnaire, administrateur |
| Images | Stockage objet/CDN à sélectionner | Photos produits et médias |
| Tests | Vitest, React Testing Library, Playwright | Tests unitaires, intégration et E2E |
| Qualité | ESLint, Prettier, TypeScript strict | Qualité et cohérence du code |
| Hébergement | Vercel | Previews et Production |
| Versionnement | GitHub | Code, historique, PR et releases |

**Architecture :** application React (SPA) et API TypeScript séparée dans le même dépôt. Le navigateur appelle exclusivement l'API publique ; les accès Neon, les contrôles de rôle et les secrets restent dans les fonctions serveur Vercel. Ne jamais connecter directement le navigateur à PostgreSQL.

### Organisation logique

```text
React Browser
    |
    | HTTPS / Clerk session
    v
Vercel Functions (API)
    |
    +---- Clerk (identité et session)
    |
    +---- Service métier / validation / RBAC
    |
    +---- Drizzle ORM
              |
              v
         Neon PostgreSQL

Images produit -> Stockage objet / CDN
GitHub -> CI, Pull Requests -> Vercel Preview
main -> Vercel Production
```

### Structure de dépôt prévue

La structure sera créée progressivement, en conservant une séparation claire entre frontend, API, domaine et infrastructure.

```text
ctrl-tech-plateforme/
├── apps/
│   ├── web/                    # Application React + Vite
│   └── api/                    # Fonctions/API Vercel
├── packages/
│   ├── ui/                     # Composants et design system partagé
│   ├── domain/                 # Types et règles métier partagées
│   └── config/                 # Configurations TS, ESLint, etc.
├── db/
│   ├── schema/                 # Schéma Drizzle
│   ├── migrations/             # Migrations SQL versionnées
│   └── seed/                   # Données de démonstration non sensibles
├── docs/
│   ├── architecture/
│   ├── decisions/              # ADR : décisions d'architecture
│   ├── security/
│   ├── operations/
│   └── product/
├── tests/
│   ├── integration/
│   └── e2e/
├── .github/
│   └── workflows/              # CI et contrôles automatisés
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── ...
```

La structure finale peut être ajustée au premier commit technique, mais les frontières de responsabilité doivent rester explicites.

## 4. Expérience utilisateur et design

### Direction artistique validée — Precision Retail

La direction artistique officielle est **Precision Retail** : une expérience premium, éditoriale et technique, inspirée d'un showroom technologique contemporain.

- **Palette :** Graphite profond `#14232B`, Ivoire minéral `#F3F0E8`, Orange signal `#D96B45`, Sauge technique `#B9C9B8`, Blanc optique `#FFFFFF`, Gris titane `#69777B`, Champagne `#E8C77A`.
- **Titres :** Space Grotesk.
- **Interface et lecture :** Instrument Sans.
- **Données techniques :** IBM Plex Mono.
- **Espacement :** échelle basée sur 4 px, de 4 à 96 px, avec règles de composition desktop/mobile.
- **Ambiance :** hiérarchie éditoriale, espaces généreux, photographie produit soignée, accents orange mesurés et animations discrètes.
- **À éviter :** néons, cyberpunk, dégradés génériques et décorations sans fonction.
- **Accessibilité :** cible WCAG 2.2 AA et respect de `prefers-reduced-motion`.

La spécification des couleurs, typographies, espacements, grilles, composants et comportements est documentée dans [Design System Precision Retail](docs/design/DESIGN-SYSTEM.md).

### Architecture UX validée

- Accueil éditorial.
- Navigation hybride : accès par catégories et par marques.
- Catalogue avec recherche, filtres et tri.
- Pages catégories adaptées à chaque famille.
- Fiche produit avec galerie, variantes, prix, disponibilité et caractéristiques structurées.
- Comparateur activé, limité à trois produits d'une même famille.
- Panier persistant.
- Compte client requis pour finaliser une commande et consulter son suivi.
- Checkout en étapes, avec méthodes de paiement et modes de réception uniquement après validation métier.
- Confirmation et suivi de commande.
- Back-office avec sidebar : dashboard, catalogue, inventaire, commandes, clients, promotions, rapports, équipe, paramètres et journal d'activité.

Le détail des 22 écrans, de leurs sections, états, interactions, règles responsive et parcours critiques figure dans [Screen Specification v1.0](docs/product/SCREEN-SPECIFICATION.md). Les décisions validées et celles qui restent à confirmer sont recensées dans [UX Decisions](docs/product/UX-DECISIONS.md).

### Responsive

Concevoir chaque écran pour mobile, tablette et desktop : navigation adaptée, grilles ajustées, filtres mobiles en panneau, tableaux administratifs transformés en vues lisibles et zones tactiles confortables. Les breakpoints sont des repères ; les composants doivent s'adapter à l'espace réellement disponible.

## 5. Back-office et rôles

### Rôles initiaux

| Rôle | Capacités |
|---|---|
| Client | Profil, adresses, panier et commandes personnelles |
| Opérateur | Consultation et traitement opérationnel des commandes selon permissions |
| Gestionnaire catalogue | Produits, catégories, marques, prix, médias et stock |
| Administrateur | Utilisateurs internes, rôles, paramètres et accès complets |
| Super administrateur technique | Configuration critique et audit technique |

Le rôle est enregistré et contrôlé côté serveur. Les métadonnées Clerk peuvent aider à transporter des claims, mais ne remplacent pas les autorisations vérifiées sur les ressources en base.

### Modules d'administration

- Tableau de bord : ventes, commandes à traiter, produits faibles en stock et indicateurs.
- Catalogue : CRUD produits, variantes, SKU, marques, catégories et caractéristiques.
- Médias : images, ordre d'affichage, texte alternatif.
- Inventaire : quantité, seuil d'alerte, mouvements et historique.
- Commandes : détail, statut, paiement, livraison/retrait et historique.
- Clients : informations nécessaires au service, avec accès limité.
- Promotions : codes, dates, conditions et limites.
- Contenu : bannières, pages, FAQ et mise en avant.
- Utilisateurs internes et rôles.
- Journal d'audit et paramètres.

## 6. Modèle de données initial

Schéma relationnel à confirmer pendant la conception détaillée. Toutes les tables transactionnelles auront des identifiants stables, dates de création/mise à jour et contraintes adaptées.

### Catalogue
- `brands` : marques.
- `categories` : catégories hiérarchiques.
- `products` : nom, slug, description, marque, catégorie, statut de publication.
- `product_variants` : SKU, options, prix et caractéristiques de variante.
- `product_images` : URL de média, ordre, texte alternatif.
- `product_attributes` / `attribute_values` : caractéristiques structurées.
- `inventory_items` : quantité disponible et seuil d'alerte.
- `inventory_movements` : entrées, sorties, corrections et auteur.

### Clients et commandes
- `customer_profiles` : profil applicatif lié à l'identifiant Clerk.
- `customer_addresses` : adresses de livraison/facturation.
- `carts` / `cart_items` : panier.
- `orders` / `order_items` : commande et instantané des prix/produits au moment de l'achat.
- `order_status_history` : historique des changements.
- `payments` : méthode, montant, devise, référence et statut ; ne jamais stocker de données de carte bancaire.
- `deliveries` : mode, adresse, frais, statut et preuve de remise si nécessaire.

### Gestion et conformité
- `promotions` / `promotion_redemptions`.
- `admin_users` ou table de rôles liée à Clerk.
- `audit_logs` : acteur, action, ressource, date et métadonnées minimales.
- `store_settings` : devise, coordonnées, règles et paramètres commerciaux.
- `webhook_events` : identifiants d'événements traités pour assurer l'idempotence.

### Règles de données
- Prix stockés en unités monétaires entières (ex. cents USD) ou en numeric exact, jamais en float.
- Devise enregistrée explicitement sur chaque commande.
- Une commande conserve un instantané du nom, SKU, prix et quantité au moment de l'achat.
- Contraintes SQL, clés étrangères et index sur les recherches fréquentes.
- Transactions atomiques pour création de commande et réservation/décrément de stock.
- Soft delete uniquement lorsque pertinent ; ne pas masquer les obligations de conservation.
- Horodatages UTC en base, affichage dans le fuseau local approprié.
- Migrations Drizzle obligatoirement versionnées et relues.

## 7. Sécurité et protection des données

### Authentification et autorisation
- Clerk pour inscription/connexion, récupération de compte et gestion des sessions.
- Activer les protections MFA pour les comptes administrateurs.
- Vérifier la session et l'identité dans chaque endpoint privé.
- RBAC avec principe du moindre privilège et contrôle d'accès à chaque ressource.
- Empêcher un client de consulter ou modifier les commandes d'un autre client.
- Procédure de révocation des comptes et sessions internes.

### API et application
- Validation serveur de toutes les entrées avec Zod.
- Protection contre injections SQL via ORM et requêtes paramétrées.
- Protection XSS : échappement, politique CSP et rendu contrôlé.
- Protection CSRF selon le mécanisme de session/cookies retenu.
- Rate limiting sur login, recherche sensible, checkout et endpoints publics coûteux.
- CORS limité aux domaines autorisés.
- Headers de sécurité : CSP, HSTS en production, X-Content-Type-Options, Referrer-Policy et frame-ancestors.
- Erreurs API sans stack trace ni secret en production.
- Idempotence des actions de checkout et webhooks.
- Vérification de signature des webhooks.
- Journaux sans mots de passe, tokens, données de paiement ou informations personnelles inutiles.

### Secrets et infrastructure
- Secrets Vercel par environnement (Development, Preview, Production).
- Variables publiques explicitement préfixées et limitées au strict nécessaire.
- `DATABASE_URL` privée, pool de connexions adapté aux fonctions serverless.
- Rotation des clés en cas d'exposition.
- Branches Neon séparées pour production et préproduction ; données de production interdites dans les previews sans anonymisation.
- Sauvegardes et procédure de restauration testée.
- Dépendances auditées, mises à jour contrôlées et verrouillage du lockfile.
- Protection des branches et revue obligatoire avant fusion dans `main`.

### Données personnelles
- Collecter uniquement les données nécessaires à la commande et au support.
- Politique de confidentialité claire et durée de conservation définie.
- Accès interne limité et journalisé.
- Processus de demande d'accès, rectification et suppression selon les obligations applicables.
- Ne pas enregistrer les coordonnées de paiement sensibles.
- Définir les responsabilités et obligations légales applicables en RDC avant lancement.

## 8. Commandes, paiement et livraison

### Cycle de commande proposé

```text
Panier
  -> Coordonnées client
  -> Mode de réception (livraison / retrait, à confirmer)
  -> Mode de paiement disponible
  -> Vérification serveur du prix et du stock
  -> Création de commande (pending)
  -> Confirmation du paiement par procédure autorisée
  -> Préparation
  -> Expédition ou retrait
  -> Remise au client
  -> Clôture
```

Les statuts devront être définis dans une machine à états contrôlée côté serveur. Un client ne peut pas s'auto-attribuer un paiement confirmé ou une commande livrée.

### Paiements
Le catalogue mentionne espèces et Mobile Money. La première version peut gérer des paiements à confirmer manuellement par le personnel, avec référence et journal d'action. Une intégration opérateur/API ne sera développée qu'après validation du prestataire, des frais, du règlement, des callbacks et des conditions commerciales. Aucun paiement ne doit être présenté comme automatisé avant tests réels.

### Livraison et retrait
Définir avec CTRL-TECH les quartiers/zones desservis, frais, délais, heures, retrait en magasin, responsabilités et procédure en cas d'échec. Les règles doivent être configurables plutôt que codées en dur.

## 9. Recherche, référencement et performance

- URLs lisibles et stables pour catégories et produits.
- Titres, descriptions, canonical, Open Graph et données structurées Product/Offer lorsque les données sont exactes.
- Sitemap XML, robots.txt et pages 404 propres.
- Images responsives, formats modernes et lazy loading.
- Découpage du bundle, chargement différé des modules admin et composants lourds.
- Cache contrôlé : ne jamais mettre en cache une donnée privée ou un stock sensible sans stratégie d'invalidation.
- Objectifs Core Web Vitals à mesurer sur appareils réels.
- Recherche par nom, marque, catégorie et SKU ; filtres prix, disponibilité et caractéristiques.
- Analytics respectueux de la vie privée, avec événements e-commerce essentiels et consentement si requis.

## 10. Stratégie GitHub, versions et previews Vercel

### Dépôt
- Repository : https://github.com/ArnoldMenes1/ctrl-tech-plateforme
- Branche de production : `main`.
- Branche d'intégration : `develop` si le rythme de travail le justifie.
- Branches de travail : `feat/<sujet>`, `fix/<sujet>`, `chore/<sujet>`, `docs/<sujet>`.
- Releases : tags sémantiques `v0.1.0`, `v0.2.0`, `v1.0.0`.

### Cycle d'une version
1. Créer une branche dédiée depuis la branche de travail.
2. Implémenter une évolution isolée et documenter les changements.
3. Exécuter lint, typecheck, tests et build.
4. Ouvrir une Pull Request.
5. Laisser Vercel générer un Preview Deployment pour la PR.
6. Tester le preview : mobile, desktop, parcours concernés, erreurs et sécurité.
7. Corriger, faire relire et fusionner.
8. Générer une release/tag lorsque le jalon est validé.
9. La fusion de `main` déclenche le déploiement Production après les contrôles requis.

### Historique des previews
- Git conserve le code et l'historique de chaque commit, branche et tag.
- Vercel associe des URLs Preview aux commits/PR selon sa configuration et ses règles de rétention.
- Les previews ne sont pas garanties éternellement par Vercel : la rétention et les limites dépendent du plan et des paramètres du compte.
- Pour retrouver une version, utiliser son tag/commit GitHub et relancer un déploiement depuis ce commit si le déploiement précédent n'est plus conservé.
- Les previews doivent utiliser des variables Preview et une base Neon non-production.
- Aucun secret de production ni donnée client réelle dans un environnement Preview.
- La Production correspond uniquement à une release validée.

### Environnements
| Environnement | Source | Base Neon | Clerk |
|---|---|---|---|
| Local | branche de travail | branche dev dédiée | instance dev |
| Preview | PR / branche | branche preview/dev isolée | instance dev |
| Production | `main` / release validée | branche production | instance production |

La création et le rattachement des projets Vercel, Neon et Clerk nécessitent les autorisations du propriétaire des comptes et la configuration des secrets. Ne jamais committer les fichiers `.env`.

## 11. CI/CD et qualité

À chaque Pull Request :
- installation reproductible depuis le lockfile ;
- ESLint ;
- vérification TypeScript stricte ;
- tests unitaires ;
- tests d'intégration API et base sur environnement isolé ;
- build de production ;
- audit des dépendances et détection de secrets ;
- tests E2E Playwright sur les parcours critiques, selon disponibilité du runner.

Avant release :
- migration testée sur base de staging ;
- revue des changements SQL ;
- tests de permissions ;
- vérification des parcours panier/commande ;
- contrôle responsive et accessibilité ;
- contrôle SEO et performance ;
- vérification des variables d'environnement ;
- plan de rollback documenté.

## 12. Plan de développement complet

Les phases sont séquentielles, avec un livrable vérifiable et une validation avant passage à la suivante. Les durées seront estimées après inspection du dépôt et confirmation des besoins métier.

### Phase 0 — Cadrage et audit
- [ ] Confirmer le nom commercial et les coordonnées officielles.
- [ ] Valider les catégories, marques et produits du catalogue.
- [ ] Collecter prix, SKU, variantes, stock et photos réelles.
- [ ] Confirmer les garanties, retours et SAV.
- [ ] Définir paiement, livraison et retrait.
- [ ] Définir les rôles et responsables CTRL-TECH.
- [ ] Définir les langues et devises de lancement.
- [ ] Formaliser les critères d'acceptation et le périmètre MVP.

**Livrable :** cahier des charges métier validé.

### Phase 1 — UX, UI et design system
- [ ] Arborescence et parcours utilisateur.
- [ ] Wireframes mobile et desktop.
- [ ] Direction artistique et tokens.
- [ ] Composants : boutons, champs, cartes, badges, menus, modales, tableaux.
- [ ] Maquettes accueil, listing, produit, panier, checkout et admin.
- [ ] États vides, chargement, erreur et succès.
- [ ] Vérification accessibilité et responsive.

**Livrable :** système visuel et maquettes validées.

### Phase 2 — Fondations techniques
- [ ] Initialiser React, Vite et TypeScript strict.
- [ ] Configurer Tailwind, routing et composants UI.
- [ ] Mettre en place conventions de code et scripts.
- [ ] Structurer frontend, API et packages partagés.
- [ ] Configurer ESLint, Prettier, Vitest et Playwright.
- [ ] Ajouter `.env.example`, règles Git et documentation.
- [ ] Mettre en place CI GitHub.
- [ ] Connecter le dépôt à Vercel et vérifier un premier Preview.

**Livrable :** socle technique reproductible et premier preview.

### Phase 3 — Base de données et API
- [ ] Créer le projet Neon et séparer dev/preview/production.
- [ ] Configurer Drizzle et migrations.
- [ ] Implémenter catalogue, catégories, marques et médias.
- [ ] Implémenter clients, adresses et rôles.
- [ ] Implémenter panier, commandes et lignes de commande.
- [ ] Implémenter inventaire, mouvements et statuts.
- [ ] Ajouter contraintes, index et transactions.
- [ ] Construire API validée avec Zod.
- [ ] Ajouter journal d'audit et idempotence.

**Livrable :** modèle de données migré et API testée.

### Phase 4 — Authentification et sécurité
- [ ] Créer et configurer l'application Clerk.
- [ ] Intégrer connexion, inscription et récupération.
- [ ] Protéger les routes privées.
- [ ] Implémenter RBAC serveur.
- [ ] Sécuriser l'administration et exiger MFA pour les rôles privilégiés.
- [ ] Ajouter rate limiting, headers, CORS et validation.
- [ ] Vérifier l'isolation des données entre clients.
- [ ] Réaliser une revue de sécurité.

**Livrable :** accès sécurisé et matrice de permissions validée.

### Phase 5 — Boutique publique
- [ ] Construire header, navigation et footer.
- [ ] Construire accueil et catégories.
- [ ] Construire recherche, filtres et tri.
- [ ] Construire cartes et fiches produits.
- [ ] Ajouter galerie, caractéristiques et disponibilité.
- [ ] Ajouter panier persistant.
- [ ] Ajouter pages institutionnelles et contact.
- [ ] Ajouter SEO technique et métadonnées.

**Livrable :** boutique consultable avec catalogue réel validé.

### Phase 6 — Checkout et opérations
- [ ] Formulaire de commande.
- [ ] Revalidation serveur des prix et stocks.
- [ ] Création transactionnelle de commande.
- [ ] Modes de paiement confirmés par CTRL-TECH.
- [ ] Confirmation manuelle sécurisée si nécessaire.
- [ ] Gestion des frais et zones de livraison.
- [ ] Notifications transactionnelles.
- [ ] Historique de commande et suivi client.

**Livrable :** commande de bout en bout en environnement de test.

### Phase 7 — Back-office
- [ ] Dashboard et indicateurs.
- [ ] CRUD produits, catégories, marques et variantes.
- [ ] Gestion des images.
- [ ] Gestion stock et mouvements.
- [ ] Gestion des commandes et statuts.
- [ ] Gestion clients et promotions.
- [ ] Gestion utilisateurs et rôles.
- [ ] Audit et paramètres magasin.

**Livrable :** équipe CTRL-TECH autonome sur les opérations courantes.

### Phase 8 — Tests, optimisation et recette
- [ ] Tests unitaires et intégration.
- [ ] Tests E2E des parcours critiques.
- [ ] Tests de permissions et accès directs API.
- [ ] Tests responsive sur navigateurs et appareils.
- [ ] Accessibilité clavier et lecteur d'écran.
- [ ] Optimisation images, bundle et Core Web Vitals.
- [ ] Vérification SEO, contenus et liens.
- [ ] Tests de charge ciblés et erreurs.
- [ ] Recette métier avec CTRL-TECH.

**Livrable :** procès-verbal de recette et liste de corrections clôturée.

### Phase 9 — Préparation production
- [ ] Valider le domaine et le DNS.
- [ ] Configurer Clerk en production.
- [ ] Configurer Neon production et sauvegardes.
- [ ] Configurer les secrets Vercel Production.
- [ ] Exécuter migrations contrôlées.
- [ ] Importer le catalogue validé.
- [ ] Configurer analytics et monitoring.
- [ ] Vérifier politiques, conditions de vente et contacts.
- [ ] Tester commande réelle selon procédure autorisée.
- [ ] Préparer rollback et support de lancement.

**Livrable :** environnement production prêt, non ouvert au public avant autorisation.

### Phase 10 — Lancement et amélioration continue
- [ ] Validation finale du responsable CTRL-TECH.
- [ ] Promotion de la release validée en Production.
- [ ] Vérification post-déploiement.
- [ ] Suivi erreurs, disponibilité et commandes.
- [ ] Collecte des retours utilisateurs.
- [ ] Priorisation des améliorations.
- [ ] Releases régulières et previews systématiques.

**Livrable :** plateforme en exploitation et cycle de maintenance établi.

## 13. Tests d'acceptation MVP

Le MVP ne sera considéré comme prêt que si :

- [ ] Un visiteur peut parcourir et rechercher les produits publiés.
- [ ] Les prix, variantes et disponibilités affichés proviennent de la base.
- [ ] Un client peut créer un compte et gérer son profil.
- [ ] Un client peut constituer un panier et passer une commande.
- [ ] Le prix et le stock sont revérifiés côté serveur au checkout.
- [ ] Un client ne peut accéder qu'à ses propres commandes.
- [ ] Un opérateur autorisé peut traiter une commande.
- [ ] Un gestionnaire peut modifier le catalogue sans accès technique à la base.
- [ ] Chaque changement de statut est historisé.
- [ ] Les erreurs réseau et les états vides sont traités proprement.
- [ ] Le site est utilisable sur smartphone.
- [ ] Les contrôles automatisés passent et une release peut être restaurée.

## 14. Décisions à confirmer avec CTRL-TECH

Ces points bloquent certaines fonctions métier et ne doivent pas être supposés :

1. Nom officiel à afficher : CTRL-TECH ou CONTROL TECH.
2. Logo, charte graphique et photos officielles.
3. Coordonnées publiques et horaires à publier.
4. Liste des produits réellement disponibles, prix et quantités.
5. Durée et conditions de garantie par catégorie.
6. Politique de retour, échange et SAV.
7. Livraison : zones, frais, délais et retrait en boutique.
8. Paiement : espèces, Mobile Money, opérateurs et confirmation.
9. Devise : USD seule ou affichage CDF complémentaire.
10. Langues : français au lancement ou français/anglais.
11. Personnes autorisées à gérer le back-office et leurs rôles.
12. Domaine final et identité de l'expéditeur des emails.

## 15. Gestion des risques

| Risque | Mesure de réduction |
|---|---|
| Prix ou stock obsolète | Mise à jour back-office et date de dernière vérification |
| Commandes non honorables | Vérification stock et confirmation opérationnelle |
| Paiement contesté | Référence, preuve et validation par rôle autorisé |
| Fuite de données | RBAC, secrets isolés, audit, tests d'accès |
| Déploiement défectueux | Preview, CI, release et rollback |
| Images non autorisées | Utiliser des médias fournis ou licenciés |
| Dépendance à un prestataire | API abstraites et documentation des intégrations |
| Perte de données | Sauvegardes et exercices de restauration |

## 16. Documentation et gouvernance du projet

Chaque décision structurante doit être documentée dans `docs/decisions/` sous forme d'ADR. Les évolutions métier, schémas, variables d'environnement et procédures d'exploitation doivent être maintenus à jour.

Chaque Pull Request doit inclure :
- objectif et périmètre ;
- captures ou URL Preview si interface modifiée ;
- tests exécutés ;
- migration éventuelle ;
- impacts sécurité et données ;
- procédure de retour arrière si nécessaire.

Les versions validées sont taguées dans Git et décrites dans GitHub Releases. Le README reste le plan directeur ; les checklists de phase sont mises à jour au fur et à mesure du développement.

---

## 17. État initial du projet

**Statut :** cadrage technique documenté — implémentation à démarrer.

- [x] Dépôt GitHub identifié.
- [x] README de planification initialisé.
- [x] Stack cible définie.
- [x] Architecture logique définie.
- [x] Phases et critères MVP documentés.
- [ ] Validation métier CTRL-TECH.
- [ ] Configuration Vercel.
- [ ] Projet Neon et branches.
- [ ] Application Clerk.
- [ ] Initialisation du code et première Preview.

**Règle de progression :** avancer phase par phase, vérifier le résultat réel après chaque étape et ne déclarer une tâche terminée que lorsque le changement est présent dans le dépôt ou l'environnement concerné et a été vérifié.

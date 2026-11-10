# CTRL-TECH — Architecture détaillée des pages

> **Document :** PAGE-STRUCTURE.md  
> **Version :** 1.0  
> **Statut :** proposition de structure fonctionnelle et UX de référence  
> **Produit :** CTRL-TECH — plateforme e-commerce mono-vendeur  
> **Zone commerciale :** Lubumbashi, RDC  
> **Références :** `README.md`, `docs/design/DESIGN-SYSTEM.md`, `docs/product/SCREEN-SPECIFICATION.md`, `docs/product/UX-DECISIONS.md`

---

## 1. Objectif et périmètre

Ce document transforme les décisions produit, UX et design déjà présentes dans le dépôt en une architecture détaillée des écrans à concevoir puis à développer.

CTRL-TECH est une boutique spécialisée dans les appareils électroniques neufs. La plateforme doit permettre aux visiteurs de découvrir, rechercher, filtrer et comparer les produits, puis aux clients authentifiés de passer commande et de suivre leurs achats. Le back-office doit assurer la gestion opérationnelle réelle du catalogue, des stocks, des commandes, des clients et des paramètres du magasin.

Cette spécification couvre :

- la boutique publique (storefront) ;
- l'authentification et le parcours d'achat ;
- l'espace client ;
- le back-office ;
- les composants partagés ;
- les routes ;
- les états fonctionnels et les règles de validation ;
- l'ordre recommandé de réalisation.

Ce document ne confirme pas les règles commerciales qui restent à valider : moyens de paiement, frais et zones de livraison, horaires, garanties, politique de retour, prix et disponibilité des produits.

## 2. Principes de conception

### 2.1 Positionnement

La direction visuelle retenue est **Precision Retail** : premium, éditoriale, technique, claire et accessible. L'interface doit inspirer la confiance et mettre les produits au premier plan, sans surcharge décorative.

Principes à appliquer :

1. Hiérarchie éditoriale forte : titres, descriptions et appels à l'action clairement différenciés.
2. Grilles précises et alignements cohérents.
3. Espaces négatifs généreux pour valoriser les produits.
4. Photographies de produits de qualité, avec cadrage et ratio cohérents.
5. Surfaces sobres et lisibles ; effets de verre réservés aux menus flottants, drawers et modales lorsqu'ils améliorent la compréhension.
6. Animations discrètes, utiles et respectueuses de la préférence de réduction des mouvements.
7. Comportement responsive mobile-first.
8. Accessibilité visée : WCAG 2.2 AA.

### 2.2 Identité visuelle

Les écrans doivent reprendre les tokens du document `docs/design/DESIGN-SYSTEM.md`. Les valeurs de référence du système de marque comprennent :

| Token / rôle | Valeur |
|---|---|
| Graphite | `#14232B` |
| Ivoire | `#F3F0E8` |
| Orange signal | `#D96B45` |
| Sauge | `#B9C9B8` |
| Blanc | `#FFFFFF` |
| Titane | `#69777B` |

Ne pas créer de palette concurrente dans les pages. Les couleurs de statut (succès, avertissement, erreur, information) doivent être définies dans les tokens du système de design et utilisées de façon cohérente.

### 2.3 Typographie

Respecter les familles typographiques définies par le design system :

- **Space Grotesk** : titres et accroches éditoriales ;
- **Instrument Sans** : textes, navigation, formulaires et interface ;
- **IBM Plex Mono** : prix, SKU, références et données techniques lorsque la distinction monospace améliore la lecture.

Les tailles, graisses, interlignages et règles d'échelle doivent provenir des tokens typographiques du design system, sans styles isolés inventés par page.

### 2.4 Formes, espacements et surfaces

- Utiliser l'échelle d'espacement commune du design system (base de 4 px).
- Utiliser les rayons prévus par le système (notamment 6, 10, 16 et 20 px selon le composant).
- Les cartes produits doivent rester lisibles et sobres.
- Les boutons doivent avoir des états normal, hover, focus-visible, active, disabled et loading.
- Les champs doivent avoir des états normal, focus, erreur, désactivé et aide contextuelle.
- Les ombres et effets vitrés doivent être mesurés et non systématiques.

---

## 3. Architecture fonctionnelle

La plateforme est organisée en deux espaces distincts :

### 3.1 Boutique publique

- Accueil éditorial
- Catalogue général
- Catégories et sous-catégories
- Marques
- Fiche produit
- Comparateur
- Panier
- Inscription, connexion et récupération de compte
- Checkout
- Confirmation de commande
- Suivi de commande
- Espace client
- Pages institutionnelles
- Pages système

### 3.2 Back-office

- Dashboard
- Produits
- Marques
- Catégories
- Bibliothèque de médias
- Inventaire
- Commandes
- Clients
- Promotions
- Rapports
- Équipe et permissions
- Paramètres du magasin
- Journal d'activité

La boutique et le back-office partagent les tokens et composants de base, mais utilisent des layouts et des densités d'information adaptés à leurs tâches.

---

# 4. Spécification des pages publiques

## P01 — Accueil éditorial

**Route :** `/`  
**Objectif :** installer l'identité CTRL-TECH, présenter les univers produits et orienter rapidement vers le catalogue ou une sélection.

### Structure, dans l'ordre

1. **Announcement bar**
   - Message court uniquement si une annonce active et validée existe.
   - Lien facultatif vers la page concernée.
   - Possibilité de fermer le bandeau.
   - Ne pas afficher de promotion ou de promesse non confirmée.

2. **Header global**
   - Logo CTRL-TECH cliquable vers l'accueil.
   - Navigation par catégories.
   - Entrée « Marques » ouvrant un menu organisé.
   - Recherche.
   - Accès au compte.
   - Panier avec compteur.
   - Éventuel sélecteur de devise si la règle de conversion et l'affichage multi-devise sont activés.

3. **Hero éditorial**
   - Titre proposé : « La technologie qui accompagne vos ambitions. »
   - Texte : « Découvrez une sélection d'appareils électroniques conçus pour travailler, créer et aller plus loin. »
   - CTA principal : « Explorer le catalogue ».
   - CTA secondaire : « Découvrir nos marques ».
   - Visuel produit dominant.
   - Desktop : texte à gauche, visuel à droite, composition asymétrique.
   - Mobile : texte, CTA puis visuel.

4. **Bandeau de réassurance**
   - Présenter uniquement les engagements confirmés : produits neufs, garantie, paiement, livraison ou retrait.
   - Chaque engagement doit renvoyer vers une explication si nécessaire.

5. **Univers produits**
   - Smartphones.
   - Ordinateurs portables.
   - Tablettes.
   - Audio et accessoires.
   - Cartes de catégories avec image ou visuel éditorial.

6. **Sélection CTRL-TECH**
   - Sélection administrable.
   - Produits publiés uniquement.
   - Cartes produits cohérentes avec le catalogue.
   - Lien « Voir toute la sélection ».

7. **Focus marque ou gamme**
   - Une marque ou gamme mise en avant.
   - Présentation courte.
   - Produits associés.
   - Ne pas exposer une marque sans produit publié, sauf campagne éditoriale explicite.

8. **Nouveautés**
   - Produits récemment publiés.
   - Ne pas confondre date de publication et disponibilité physique.

9. **Sélection professionnelle / performance**
   - Produits destinés au travail, à la création ou aux usages exigeants.
   - Contenu éditorial administrable.

10. **Accessoires complémentaires**
    - Accessoires associés à des usages ou produits compatibles.
    - Éviter les associations non vérifiées.

11. **Présentation du magasin**
    - CTRL-TECH, avenue Maniema, Lubumbashi, RDC.
    - Coordonnées et horaires seulement après validation.

12. **Footer**
    - Navigation catalogue.
    - Informations magasin.
    - Aide et politiques.
    - Réseaux sociaux uniquement si les comptes officiels sont confirmés.
    - Mentions légales et copyright.

### Données et comportements

- Toutes les sélections sont administrables.
- Afficher uniquement les produits publiés.
- Masquer une section sans contenu plutôt que d'afficher un bloc vide.
- Prix, devise et stock viennent de données validées.
- Les produits indisponibles ne doivent pas être présentés comme immédiatement achetables.

### Responsive

- Hero vertical sur mobile.
- Catégories en rangée horizontale si nécessaire.
- Grille de produits en une ou deux colonnes selon la largeur et la lisibilité.
- Footer réorganisé en sections repliables si cela facilite l'utilisation.

## P02 — Catalogue général

**Route :** `/catalogue`  
**Objectif :** retrouver un produit dans l'ensemble du catalogue publié.

### Structure

1. Breadcrumb : Accueil / Catalogue.
2. Titre « Tous les produits » et introduction courte.
3. Champ de recherche.
4. Nombre de résultats.
5. Filtres.
6. Tri.
7. Résumé des filtres actifs avec suppression individuelle et action « Tout effacer ».
8. Grille de produits.
9. Pagination ou chargement progressif.

### Filtres

- Catégorie et sous-catégorie.
- Marque.
- Fourchette de prix.
- Disponibilité.
- Attributs techniques contextuels à la famille de produits.

Exemples de filtres contextuels :

- Ordinateurs : processeur, RAM, stockage, GPU, taille d'écran.
- Smartphones : génération ou gamme, stockage, taille d'écran.
- Tablettes : taille d'écran, stockage, connectivité.
- Accessoires : type, compatibilité et caractéristiques pertinentes.

### Tri

- Pertinence.
- Nouveautés.
- Prix croissant.
- Prix décroissant.
- Nom.

### Carte produit

- Image principale.
- Marque ou catégorie si utile.
- Nom du produit.
- Configuration courte.
- Prix et devise.
- Disponibilité réelle.
- Accès à la fiche.
- Action « Ajouter au comparateur ».
- Action « Ajouter au panier » seulement si le produit est achetable.

### États

- Chargement : skeletons de cartes.
- Résultats : grille standard.
- Aucun résultat : explication et réinitialisation des filtres.
- Erreur : message et action de nouvelle tentative.
- Produit indisponible : statut clair, action d'achat désactivée.

### Responsive

- Desktop : filtres latéraux, grille de 3 à 4 colonnes selon largeur.
- Mobile : filtres dans un drawer, tri facilement accessible, grille de 1 à 2 colonnes.

## P03 — Catégorie et sous-catégorie

**Routes :** `/categories/:slug`  
**Objectif :** présenter un univers cohérent et ses filtres spécifiques.

### Structure

1. Breadcrumb.
2. Titre et introduction éditoriale.
3. Visuel de catégorie facultatif.
4. Sous-catégories.
5. Marques actives dans cette catégorie.
6. Sélection de produits.
7. Filtres spécifiques.
8. Tri.
9. Grille catalogue.
10. Guide d'achat ou contenu d'aide si disponible.

### Exemples de familles

- Ordinateurs : bureautique, professionnel, création, gaming.
- Smartphones : familles Apple iPhone et Samsung Galaxy, selon le catalogue publié.
- Tablettes : marque, taille d'écran, stockage et connectivité.
- Accessoires : audio, montres, stockage, chargeurs, hubs et périphériques.

Ne pas afficher une sous-catégorie ou une marque sans produits publiés, sauf choix éditorial explicite.

## P04 — Marques

**Routes :** `/marques`, `/marques/:slug`  
**Objectif :** permettre une découverte par fabricant.

### Index des marques

- Titre et introduction.
- Recherche ou index alphabétique si le volume le justifie.
- Grille de logos ou de cartes.
- Marques ayant au moins un produit publié et consultable.
- État vide si aucune marque n'est disponible.

### Détail d'une marque

- Breadcrumb.
- Logo et nom.
- Présentation éditoriale validée.
- Catégories concernées.
- Filtres et tri.
- Grille des produits publiés.

## P05 — Fiche produit

**Route :** `/produit/:slug`  
**Objectif :** fournir les informations nécessaires à une décision d'achat fiable.

### Zone principale

- Desktop : galerie média environ 58 %, informations et achat environ 42 %.
- Mobile : galerie puis informations et actions.

### Galerie

- Image principale.
- Miniatures.
- Zoom ou affichage grand format.
- Ordre des médias administrable.
- Texte alternatif pertinent.

### Informations et achat

1. Marque.
2. Nom du produit.
3. Référence / SKU si pertinent.
4. Description courte.
5. Prix et devise.
6. Prix précédent uniquement si promotion vérifiée.
7. Sélection de variante/configuration.
8. Disponibilité réelle.
9. Quantité limitée par le stock vendable.
10. Ajouter au panier.
11. Ajouter au comparateur.
12. Garantie uniquement selon les conditions validées.

### Sections secondaires

- Présentation.
- Caractéristiques techniques structurées.
- Livraison / retrait.
- Garantie.
- Produits associés.
- Accessoires compatibles.

### Règles

- Une variante possède sa propre référence, configuration et disponibilité si applicable.
- Ne jamais proposer une variante inexistante.
- Les prix et stocks sont revalidés côté serveur avant la commande.
- Les caractéristiques doivent être structurées en base pour alimenter les filtres et le comparateur.
- Une description libre ne remplace pas des attributs techniques structurés.

## P06 — Comparateur

**Route :** `/comparateur`  
**Objectif :** comparer jusqu'à trois produits de la même famille.

### Structure

- Titre.
- Emplacements de sélection (maximum trois).
- Recherche pour ajouter un produit.
- Tableau de comparaison.
- Mise en évidence des différences.
- Liens vers les fiches produits.

### Règles

- Maximum trois produits.
- Refuser ou empêcher la comparaison de familles incompatibles.
- Afficher uniquement les attributs pertinents pour la catégorie.
- Signaler les caractéristiques non renseignées sans inventer de valeur.
- Desktop : colonnes côte à côte.
- Mobile : tableau horizontal utilisable avec libellés lisibles.

## P07 — Panier

**Route :** `/panier`  
**Objectif :** vérifier les articles avant de passer commande.

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

- Panier conservé entre les visites selon la stratégie de persistance retenue.
- Panier associé au compte après connexion.
- Revalidation serveur des prix et stocks au checkout.
- Demander l'accord du client si un prix a changé.
- Ajuster ou bloquer une quantité supérieure au stock vendable.
- Le panier ne réserve pas automatiquement les produits.
- Conserver le panier lors d'une redirection vers l'authentification.

### États

- Panier vide avec lien vers le catalogue.
- Panier chargé.
- Article devenu indisponible.
- Prix modifié.
- Erreur de synchronisation.

## P08 — Authentification

**Routes :** `/auth/connexion`, `/auth/inscription`, `/auth/recuperation`  
**Objectif :** authentifier le client et préserver la continuité du parcours d'achat.

### Inscription

- Nom complet.
- E-mail.
- Téléphone si requis par le parcours de commande.
- Mot de passe ou méthode d'authentification gérée par le fournisseur d'identité.
- Acceptation des conditions et de la politique de confidentialité selon les exigences applicables.

### Connexion

- E-mail.
- Mot de passe ou méthode activée.
- Action de connexion.
- Lien vers inscription.
- Lien de récupération.

### Récupération

- Champ d'identification requis.
- Instructions de récupération.
- Confirmation d'envoi.
- Retour à la connexion.

### Règles

- Compte obligatoire avant finalisation de commande.
- Redirection vers le parcours interrompu après authentification.
- Le panier ne doit jamais être effacé à la connexion.
- Les erreurs d'authentification doivent être compréhensibles sans révéler d'informations sensibles.

## P09 — Checkout

**Route :** `/checkout`  
**Objectif :** convertir le panier en commande.

### Étape 1 — Coordonnées

- Identité du client.
- E-mail.
- Téléphone si nécessaire.
- Adresse ou informations nécessaires au mode de réception.

### Étape 2 — Réception

- Options réellement proposées par le magasin.
- Livraison ou retrait uniquement si ces options sont confirmées.
- Adresse et instructions si livraison activée.
- Coût et délai uniquement s'ils sont calculables et validés.

### Étape 3 — Paiement

- Moyens de paiement effectivement activés.
- Instructions et références nécessaires.
- Statut de paiement distinct du statut de commande.

### Étape 4 — Vérification

- Articles.
- Variantes.
- Quantités.
- Prix revalidés.
- Mode de réception.
- Frais confirmés.
- Total final.
- Acceptation des conditions applicables.
- Action de confirmation.

### Règles techniques

- Revalidation serveur des prix et stocks.
- Création transactionnelle de la commande.
- Protection contre les soumissions répétées et commandes en double.
- Ne pas exposer de secrets ou de logique de paiement dans le navigateur.
- Aucune méthode de paiement ne doit apparaître avant son activation réelle.

## P10 — Confirmation de commande

**Route :** `/commande/confirmation/:id`  
**Objectif :** confirmer la réception de la commande et expliquer la suite.

### Contenu

- Message de confirmation de réception.
- Numéro unique.
- Date.
- Articles commandés.
- Total et devise.
- Mode de réception.
- Méthode et statut de paiement.
- Prochaine étape.
- Lien vers le suivi et l'espace client.

Une commande reçue n'est pas nécessairement payée, confirmée ou préparée. Le message doit refléter le statut réel.

## P11 — Suivi de commande

**Route :** `/commandes/:id/suivi`  
**Objectif :** informer le client de l'avancement.

### Contenu

- Numéro de commande.
- Date.
- Articles.
- Statut de paiement.
- Mode de réception.
- Statut courant.
- Historique chronologique horodaté.

### Cycle indicatif à confirmer

`Reçue → À confirmer → Confirmée → En préparation → Prête / Expédiée → Terminée`

Les statuts doivent provenir de la base de données et être mis à jour par des actions autorisées.

## P12 — Espace client

**Routes :** `/compte` et sous-routes  
**Objectif :** donner au client un espace personnel pour ses informations et ses achats.

### Tableau de bord

- Message de bienvenue.
- Résumé du compte.
- Commandes récentes.
- Commandes nécessitant une action.
- Accès rapides aux rubriques.

### Mes commandes

- Liste paginée.
- Numéro.
- Date.
- Total.
- Statut commande.
- Statut paiement.
- Accès au détail et au suivi.

### Détail d'une commande

- Articles et variantes.
- Prix de la commande.
- Réception.
- Paiement.
- Historique des statuts.

### Mes informations

- Nom.
- E-mail.
- Téléphone si utilisé.
- Modification sécurisée.

### Mes adresses

- Liste.
- Ajout.
- Modification.
- Suppression.
- Adresse par défaut si cette notion est nécessaire.

### Sécurité

- Gestion du compte via le fournisseur d'identité.
- Méthodes d'authentification activées.
- Déconnexion.

Chaque client ne peut accéder qu'à ses propres informations et commandes.

## P13 — Pages institutionnelles

**Routes :**

- `/a-propos`
- `/contact`
- `/livraison`
- `/garantie`
- `/retours`
- `/conditions-generales`
- `/confidentialite`
- `/faq`

### À propos

- Présentation de CTRL-TECH.
- Positionnement et univers produits.
- Informations sur le magasin validées.

### Contact

- Coordonnées officielles.
- Adresse du magasin.
- Horaires validés.
- Formulaire de contact si un traitement serveur et une destination sont configurés.

### Livraison et retrait

- Options disponibles.
- Zones desservies.
- Délais et frais validés.
- Modalités de retrait.

### Garantie et retours

- Conditions réelles et validées.
- Délais.
- Procédure.
- Cas d'exclusion éventuels.

### Conditions et confidentialité

- Textes validés juridiquement.
- Informations sur les données collectées et leur utilisation.
- Moyens de contact relatifs aux données personnelles.

### FAQ

- Questions et réponses administrables.
- N'afficher la page que si un contenu validé existe.

## P14 — Pages système

**Routes possibles :** `/404`, `/403`, `/500`  
Prévoir également des états dédiés pour :

- Page introuvable.
- Accès refusé.
- Erreur serveur.
- Session expirée.
- Hors connexion.
- Maintenance.
- Résultat de recherche vide.
- Ressource supprimée ou indisponible.

Chaque état doit expliquer le problème et proposer une action utile : retour, nouvelle tentative, connexion ou accès à l'accueil.

---

# 5. Spécification du back-office

## 5.1 Layout administratif commun

Le back-office utilise une sidebar persistante sur desktop et une navigation adaptée sur mobile.

### Sidebar

- Logo CTRL-TECH.
- Tableau de bord.
- Catalogue.
- Inventaire.
- Commandes.
- Clients.
- Promotions.
- Rapports.
- Équipe et permissions.
- Paramètres.
- Journal d'activité.

Les entrées et actions visibles sont filtrées selon les permissions du rôle.

### Barre supérieure

- Breadcrumb ou contexte de page.
- Recherche administrative si pertinente.
- Notifications si elles sont implémentées.
- Profil utilisateur.
- Menu de session.

### Zone de contenu

- Titre.
- Description courte.
- Action principale.
- Filtres ou contrôles contextuels.
- Contenu.
- Pagination.
- États chargement, vide, erreur et succès.

La sécurité reste toujours appliquée côté serveur ; masquer une action dans l'interface ne constitue pas une autorisation.

## A01 — Dashboard administratif

**Route :** `/admin/dashboard`  
**Objectif :** donner une vue synthétique de l'activité.

### Indicateurs

- Chiffre d'affaires calculé sur les ventes payées.
- Nombre de commandes.
- Panier moyen.
- Produits publiés.
- Alertes de stock.
- Produits en rupture.

### Sections

- Sélecteur de période.
- Graphique des ventes.
- Commandes récentes.
- Produits les plus vendus.
- Commandes à traiter.
- Alertes d'inventaire.

Les métriques doivent être calculées à partir de données réelles. Les états sans données ne doivent pas être remplacés par des chiffres fictifs. Les définitions de chaque indicateur doivent être documentées.

## A02 — Liste des produits

**Route :** `/admin/produits`

### Contrôles

- Recherche par nom ou SKU.
- Filtres marque, catégorie et statut.
- Filtre de disponibilité.
- Tri.
- Pagination.
- Action « Nouveau produit ».

### Tableau

- Image.
- Produit.
- SKU.
- Marque.
- Prix.
- Stock.
- Statut de publication.
- Actions.

### Actions

- Voir.
- Modifier.
- Prévisualiser.
- Publier.
- Dépublier.
- Archiver.

Les actions sensibles doivent être confirmées et vérifiées par l'API.

## A03 — Création et modification d'un produit

**Routes :** `/admin/produits/nouveau`, `/admin/produits/:id`

Organiser le formulaire en sections ou onglets :

1. Informations générales : nom, slug, marque, catégorie, description courte et longue.
2. Prix : montant, devise, prix précédent uniquement pour une promotion vérifiée.
3. Variantes : configuration, référence/SKU et disponibilité propre à la variante.
4. Caractéristiques techniques : attributs structurés selon la famille.
5. Médias : image principale, galerie, ordre et textes alternatifs.
6. Stock : quantité et seuil d'alerte selon le modèle d'inventaire.
7. SEO : titre, description et slug.

### Actions

- Enregistrer comme brouillon.
- Prévisualiser.
- Valider.
- Publier.

Un produit incomplet ne doit pas être publiable. Les validations côté client doivent être reproduites côté serveur.

## A04 — Marques et catégories

### Marques — `/admin/marques`

- Liste et recherche.
- Nom.
- Logo.
- Description.
- Slug.
- Statut.
- Ordre d'affichage.
- Produits associés.
- Création, modification et archivage.

### Catégories — `/admin/categories`

- Liste hiérarchique.
- Nom.
- Image.
- Description.
- Catégorie parente.
- Sous-catégories.
- Slug.
- Statut.
- Ordre d'affichage.
- Création, modification et archivage.

Empêcher les hiérarchies circulaires et les suppressions qui laisseraient des produits dans un état incohérent.

## A05 — Bibliothèque de médias

**Route :** `/admin/medias`

- Importer des images.
- Prévisualiser.
- Ajouter un texte alternatif.
- Organiser les médias.
- Associer une image à un produit.
- Modifier l'ordre d'une galerie.
- Identifier les médias utilisés.
- Supprimer les médias inutilisés avec confirmation.

Les types, tailles et formats autorisés doivent être contrôlés côté serveur et stockage.

## A06 — Inventaire

**Route :** `/admin/inventaire`

### Tableau

- Produit.
- Variante.
- Stock physique.
- Stock réservé, si le modèle le prévoit.
- Stock disponible.
- Seuil minimum.
- État.

### Actions

- Entrée de stock.
- Sortie de stock.
- Ajustement/correction.
- Historique des mouvements.
- Export selon permissions.

Chaque mouvement doit conserver au minimum la date, l'acteur, la ressource, la quantité, le type de mouvement et un motif. Les ajustements ne doivent pas écraser l'historique.

## A07 — Commandes

**Routes :** `/admin/commandes`, `/admin/commandes/:id`

### Liste

- Numéro.
- Client.
- Date.
- Total.
- Statut de commande.
- Statut de paiement.
- Mode de réception.
- Filtres et recherche.

### Détail

- Informations client nécessaires.
- Articles commandés.
- Instantané des prix et variantes.
- Références de paiement.
- Livraison ou retrait.
- Historique des statuts.
- Notes internes.
- Actions autorisées selon rôle et statut.

Les changements de statut doivent suivre une transition autorisée et être journalisés. Le statut de paiement doit rester distinct du statut de commande.

## A08 — Clients

**Routes :** `/admin/clients`, `/admin/clients/:id`

- Liste et recherche.
- Nom et coordonnées nécessaires.
- Date d'inscription.
- Nombre de commandes.
- Total des commandes payées.
- Détail du profil.
- Historique d'achat.

Limiter les données personnelles affichées et les actions selon les permissions. Ne pas exposer les secrets d'authentification.

## A09 — Promotions

**Route :** `/admin/promotions`

- Création d'une promotion.
- Code promotionnel éventuel.
- Réduction en montant ou pourcentage.
- Produits concernés.
- Catégories concernées.
- Date de début et de fin.
- Limites d'utilisation.
- Règles de cumul.
- Activation et désactivation.
- Historique.

Le calcul final d'une réduction est réalisé et validé côté serveur.

## A10 — Rapports

**Route :** `/admin/rapports`

Rapports prévus :

- Ventes par période.
- Produits les plus vendus.
- Ventes par catégorie.
- Ventes par marque.
- Valeur du stock.
- Mouvements d'inventaire.
- Commandes annulées.
- Répartition des paiements.

Prévoir filtres de période et export CSV/PDF si nécessaire. Les rapports doivent documenter leur définition et leurs sources de données.

## A11 — Équipe et permissions

**Route :** `/admin/equipe`

### Rôles proposés

| Rôle | Responsabilité |
|---|---|
| Super administrateur | Configuration technique critique |
| Administrateur | Administration générale |
| Responsable commercial | Gestion commerciale |
| Gestionnaire de stock | Inventaire |
| Gestionnaire catalogue | Produits et catégories |
| Lecture seule | Consultation autorisée |

### Fonctions

- Liste des membres.
- Invitation ou ajout selon le mécanisme d'identité retenu.
- Attribution de rôle.
- Modification des permissions autorisées.
- Désactivation d'accès.
- Historique des changements.

Les permissions doivent être vérifiées côté API pour chaque opération sensible.

## A12 — Paramètres du magasin

**Route :** `/admin/parametres`

Rubriques :

1. Informations du magasin.
2. Adresse et coordonnées.
3. Devises et règles d'affichage des prix.
4. Livraison et retrait.
5. Paiements.
6. Notifications.

Les changements critiques doivent demander confirmation et être inscrits dans le journal d'activité. Les paramètres non configurés ne doivent pas être présentés comme actifs.

## A13 — Journal d'activité

**Route :** `/admin/journal-activite`

Événements à tracer :

- Création et modification de produit.
- Publication et dépublication.
- Modification de prix.
- Entrée, sortie et correction de stock.
- Modification de commande.
- Création ou désactivation d'un membre.
- Modification de permissions.
- Changement de paramètres.

Chaque entrée doit contenir l'acteur, l'action, la ressource, la date et un résumé des changements approprié. L'accès au journal est limité aux rôles autorisés.

---

# 6. Navigation et routes

## 6.1 Routes publiques

```text
/
├── /catalogue
├── /categories/:slug
├── /marques
├── /marques/:slug
├── /produit/:slug
├── /comparateur
├── /panier
├── /auth
│   ├── /connexion
│   ├── /inscription
│   └── /recuperation
├── /checkout
├── /commande/confirmation/:id
├── /commandes/:id/suivi
├── /compte
│   ├── /commandes
│   ├── /commandes/:id
│   ├── /profil
│   ├── /adresses
│   └── /securite
├── /a-propos
├── /contact
├── /livraison
├── /garantie
├── /retours
├── /conditions-generales
├── /confidentialite
└── /faq
```

## 6.2 Routes d'administration

```text
/admin
├── /dashboard
├── /produits
├── /produits/nouveau
├── /produits/:id
├── /marques
├── /categories
├── /medias
├── /inventaire
├── /commandes
├── /commandes/:id
├── /clients
├── /clients/:id
├── /promotions
├── /rapports
├── /equipe
├── /parametres
└── /journal-activite
```

## 6.3 Règles de navigation

- Le logo ramène à l'accueil public.
- Le panier reste accessible depuis le header.
- Les filtres et tris doivent être reflétés dans l'URL lorsque cela permet le partage ou la conservation de l'état.
- Les redirections après authentification préservent le parcours interrompu.
- Les routes de compte exigent une session valide.
- Les routes d'administration exigent une session et une permission adaptée.
- Une autorisation refusée doit produire un état 403 adapté.
- Les contrôles d'accès ne reposent jamais uniquement sur le frontend.

---

# 7. Composants partagés

Les composants communs doivent être construits une seule fois et réutilisés dans les applications concernées. Ils doivent être implémentés dans la bibliothèque UI prévue par l'architecture du dépôt, par exemple `packages/ui`, après vérification de la structure effective du monorepo.

| Famille | Composants |
|---|---|
| Navigation | Header, Footer, Sidebar, Breadcrumb, MegaMenu |
| Actions | Button, IconButton, Dropdown |
| Commerce | ProductCard, CategoryCard, PriceDisplay, StockBadge |
| Produit | ProductGallery, VariantSelector, QuantitySelector |
| Recherche | SearchBar, FilterPanel, SortSelect |
| Panier | CartItem, CartDrawer, OrderSummary |
| Formulaires | Input, Select, Textarea, Checkbox |
| Feedback | Toast, Alert, Modal, Drawer |
| Données | DataTable, Pagination, StatusBadge |
| Administration | PageHeader, StatsCard, ActivityTimeline |
| Chargement | Skeleton, Spinner, EmptyState, ErrorState |

### Règles des composants

- API de composant cohérente et documentée.
- Tokens de design centralisés.
- États clavier et focus visibles.
- Labels accessibles.
- Contrastes vérifiés.
- Comportements tactiles adaptés.
- Tests unitaires des composants interactifs importants.
- Pas de copie locale de styles ou de tokens par page sans justification.

---

# 8. États transversaux obligatoires

Chaque écran qui dépend de données doit prévoir les états pertinents suivants :

| État | Comportement attendu |
|---|---|
| Initial / chargement | Skeleton ou indicateur adapté, sans saut majeur de mise en page |
| Succès | Données réelles affichées |
| Vide | Explication et action suivante utile |
| Erreur | Message compréhensible et nouvelle tentative si possible |
| Non autorisé | Accès refusé sans fuite de données |
| Session expirée | Invitation à se reconnecter et retour au parcours |
| Hors ligne | Information sur l'indisponibilité et récupération si possible |
| Action en cours | Bouton désactivé ou indicateur de progression |
| Action réussie | Confirmation visible |
| Validation invalide | Erreur au niveau du champ et résumé si nécessaire |

Ne pas utiliser de données fictives dans les écrans de production. Les données de démonstration doivent être clairement identifiées comme telles.

---

# 9. Principes de données, sécurité et intégrité

1. Le navigateur communique avec l'API ; il ne se connecte jamais directement à PostgreSQL.
2. Les secrets, clés privées et règles sensibles restent côté serveur.
3. Les prix, stocks, promotions et droits sont revalidés côté API.
4. Les commandes conservent un instantané des prix, noms et variantes au moment de l'achat.
5. Le statut de commande est distinct du statut de paiement.
6. Les opérations d'inventaire sont historisées.
7. Les accès aux commandes et profils clients sont limités à leur propriétaire ou aux rôles autorisés.
8. Les permissions sont vérifiées côté serveur.
9. Les opérations sensibles sont journalisées.
10. Les formulaires sont validés côté client pour l'expérience et côté serveur pour la sécurité.
11. Les erreurs API ne doivent pas exposer de données sensibles.
12. Les actions répétées ne doivent pas créer de commandes ou mouvements en double.

Les choix techniques détaillés restent ceux du README et des documents d'architecture du dépôt : React, TypeScript, Vite, Tailwind, React Router, TanStack Query, React Hook Form, Zod, API Node.js/TypeScript, Neon PostgreSQL, Drizzle ORM, Clerk et Vercel.

---

# 10. Responsive et accessibilité

### Desktop

- Navigation complète.
- Mega-menu et filtres latéraux lorsque pertinents.
- Grilles de produits de 3 à 4 colonnes selon la largeur.
- Back-office avec sidebar persistante.
- Tableaux avec colonnes lisibles et actions contextualisées.

### Tablette

- Navigation condensée.
- Grilles adaptées.
- Filtres dans un panneau si l'espace manque.
- Sidebar administrative repliable.

### Mobile

- Header compact avec accès recherche, panier et menu.
- Navigation tactile.
- Filtres dans un drawer.
- Grilles de 1 à 2 colonnes selon lisibilité.
- Actions principales faciles à atteindre.
- Tableaux complexes transformés en cartes ou rendus horizontalement défilables.
- Formulaires sur une seule colonne.
- Sidebar administrative transformée en menu mobile.

### Accessibilité

- Navigation complète au clavier.
- Focus visible.
- Contraste suffisant.
- Labels explicites.
- Textes alternatifs pertinents.
- Messages d'erreur associés aux champs.
- Dialogues accessibles et gestion correcte du focus.
- Respect de `prefers-reduced-motion`.
- Ne jamais transmettre une information uniquement par la couleur.

---

# 11. Ordre recommandé de réalisation

Le développement doit suivre une progression qui limite les dépendances et permet de valider le design tôt.

| Lot | Périmètre | Résultat attendu |
|---|---|---|
| 1 | Fondations visuelles | Tokens, typographies, boutons, champs, cartes, header, footer |
| 2 | Boutique principale | Accueil, catalogue, catégories, marques, fiches produits |
| 3 | Découverte avancée | Recherche, filtres, tri, comparateur |
| 4 | Achat | Panier, authentification, checkout, confirmation |
| 5 | Espace client | Profil, adresses, commandes et suivi |
| 6 | Back-office catalogue | Dashboard, produits, marques, catégories, médias |
| 7 | Opérations | Inventaire, commandes, clients, promotions |
| 8 | Administration avancée | Équipe, permissions, rapports, paramètres, journal |
| 9 | Qualité et lancement | Sécurité, accessibilité, tests, responsive, déploiement |

### Priorité de conception

Commencer par le lot 1, puis concevoir les pages publiques dans l'ordre P01 à P07. Valider ensuite le parcours d'achat complet avant d'étendre le back-office.

---

# 12. Critères d'acceptation d'une page

Une page est prête à être considérée comme spécifiée lorsque les points suivants sont documentés :

- [ ] Objectif fonctionnel précis.
- [ ] Route et règles d'accès.
- [ ] Hiérarchie et sections de l'écran.
- [ ] Comportement desktop.
- [ ] Comportement mobile.
- [ ] Composants partagés utilisés.
- [ ] Interactions et destinations des boutons.
- [ ] États chargement, vide, erreur et succès pertinents.
- [ ] Données nécessaires et source identifiée.
- [ ] Validations côté client et serveur.
- [ ] Règles de sécurité et permissions.
- [ ] Critères de test vérifiables.

## 13. Décisions restant à confirmer

Les éléments suivants doivent être confirmés par le responsable du magasin avant leur implémentation ou leur publication :

- Moyens de paiement disponibles et prestataires retenus.
- Devises acceptées, devise de référence et règles de conversion USD/CDF.
- Livraison : zones, frais, délais et transporteurs.
- Retrait en magasin : procédure et horaires.
- Garantie par catégorie ou produit.
- Politique de retour, échange et remboursement.
- Coordonnées, horaires et canaux officiels de contact.
- Règles exactes de réservation et de décrémentation du stock.
- Règles de promotions et de cumul.
- Statuts définitifs de commande et de paiement.

Aucune page ne doit inventer ces règles. Les composants correspondants peuvent être conçus, mais leur contenu doit rester configurable ou masqué tant que les décisions ne sont pas validées.

---

## 14. Références du dépôt

- `README.md` — vision produit, stack et architecture.
- `docs/design/DESIGN-SYSTEM.md` — identité visuelle et règles de composants.
- `docs/product/SCREEN-SPECIFICATION.md` — spécification des écrans.
- `docs/product/UX-DECISIONS.md` — décisions UX et règles de parcours.

**Règle de priorité :** en cas de divergence, respecter les décisions validées dans les documents de référence et mettre à jour explicitement la documentation avant de modifier l'expérience produit.

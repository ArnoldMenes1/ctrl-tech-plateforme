# CTRL-TECH — Design System

**Version :** 2.0  
**Positionnement :** Premium Technology Commerce  
**Direction visuelle :** Precision Retail · Editorial Grid · Layered Glass · Continuous Flow · Selective 3D  
**Statut :** référence de conception du storefront et du back-office. Les tokens de marque ci-dessous sont validés comme base du projet ; les composants et comportements restent à vérifier lors de leur intégration.

> Ce document est la source de référence du système de design de CTRL-TECH dans le dépôt `ctrl-tech-plateforme`. Il rassemble les fondations visuelles, les règles de composition, les composants et les comportements responsive. Il ne signifie pas que chaque composant est déjà implémenté dans le frontend.

---

## 1. Identité et intention

CTRL-TECH est une boutique de commerce électronique spécialisée dans les produits technologiques, avec une expérience premium, éditoriale et technique.

L’intention est d’associer :
- la précision d’un catalogue spécialisé ;
- la chaleur d’un showroom contemporain ;
- la lisibilité d’un outil professionnel ;
- un parcours d’achat simple, continu et rassurant.

L’interface doit mettre les produits en valeur sans rendre leur comparaison difficile. Les informations commerciales — nom, prix, devise, disponibilité, frais et conditions — restent prioritaires sur les effets visuels.

**À éviter :** dégradés bleu-violet génériques, néons, effets cyberpunk, décorations gratuites, cartes uniformes, animations excessives et interfaces surchargées.

### Principes directeurs

| Principe | Application |
|---|---|
| Precision Retail | Informations produit exactes, hiérarchie claire et données commerciales fiables. |
| Editorial Grid | Compositions structurées, espaces généreux et sections clairement identifiables. |
| Layered Glass | Surfaces vitrées limitées aux éléments flottants et contextuels. |
| Continuous Flow | Continuité entre navigation, catalogue, fiche produit, panier et commande. |
| Selective 3D | 3D réservée aux campagnes ou produits disposant d’assets fidèles et utiles. |
| Mobile-first | Parcours utilisable sur petits écrans sans perte d’information essentielle. |
| Accessibilité | Contraste, focus, clavier, labels et réduction des animations pris en compte dès la conception. |

Ordre de priorité : compréhension et lisibilité, fiabilité des informations, efficacité du parcours, identité visuelle, puis effets décoratifs.

## 2. Fondations visuelles

### 2.1 Palette chromatique

La palette suivante constitue la base de marque documentée pour CTRL-TECH.

| Token | Nom | Hex | Usage |
|---|---|---:|---|
| `color.graphite` | Graphite profond | `#14232B` | Navigation sombre, footer, titres sur fond clair, sidebar admin. |
| `color.ivory` | Ivoire minéral | `#F3F0E8` | Fond principal, surfaces éditoriales. |
| `color.signal` | Orange signal | `#D96B45` | CTA principal, accent, promotions validées. |
| `color.sage` | Sauge technique | `#B9C9B8` | États positifs secondaires, détails et badges. |
| `color.white` | Blanc optique | `#FFFFFF` | Cartes, champs et surfaces de contenu. |
| `color.titanium` | Gris titane | `#69777B` | Texte secondaire et métadonnées. |
| `color.champagne` | Champagne | `#E8C77A` | Accent premium ponctuel. |

**Règles d’utilisation**
- L’ivoire est le fond éditorial dominant ; le blanc optique détache les surfaces fonctionnelles.
- Le graphite structure la navigation et la hiérarchie.
- L’orange signal est réservé aux actions importantes et aux accents ; il ne doit pas envahir les pages.
- La sauge et le champagne restent secondaires.
- Ne jamais communiquer un état uniquement par la couleur : ajouter un libellé ou une icône.
- Vérifier les contrastes réels WCAG 2.2 AA, notamment pour les petits textes et les boutons orange. Si un couple ne passe pas, adapter la couleur du texte ou la nuance d’usage sans modifier arbitrairement la palette de marque.

### 2.2 Typographie

| Rôle | Famille | Graisses | Usage |
|---|---|---|---|
| Titres | **Space Grotesk** | 500, 600, 700 | Titres éditoriaux, titres de page, intertitres. |
| Interface et lecture | **Instrument Sans** | 400, 500, 600, 700 | Paragraphes, navigation, formulaires, boutons et descriptions. |
| Données techniques | **IBM Plex Mono** | 400, 500, 600 | Prix, SKU, références, mesures, spécifications et données tabulaires. |

#### Échelle typographique de départ

| Token | Taille | Interligne | Usage |
|---|---:|---:|---|
| `type.display` | 56 px | 1.05 | Hero desktop, très grands titres. |
| `type.h1` | 44 px | 1.10 | Titre principal desktop. |
| `type.h2` | 32 px | 1.15 | Sections majeures. |
| `type.h3` | 24 px | 1.25 | Sous-sections. |
| `type.h4` | 20 px | 1.30 | Titres de cartes et panneaux. |
| `type.body-lg` | 18 px | 1.55 | Introduction et texte éditorial. |
| `type.body` | 16 px | 1.50 | Texte courant. |
| `type.body-sm` | 14 px | 1.45 | Métadonnées et descriptions secondaires. |
| `type.caption` | 12 px | 1.40 | Légendes, aides et mentions secondaires. |

Sur mobile, réduire les grands titres de manière fluide : display 40 px maximum, H1 34 px, H2 28 px. Éviter les textes fonctionnels inférieurs à 12 px.

### 2.3 Espacement

**Base : 4 px.** Les espacements doivent provenir de cette échelle ou être justifiés par une contrainte de composant.

| Token | Valeur | Usage indicatif |
|---|---:|---|
| `space-0` | 0 px | Aucun espacement. |
| `space-1` | 4 px | Écart icône/label, micro-ajustement. |
| `space-2` | 8 px | Éléments liés, badges. |
| `space-3` | 12 px | Espacement compact entre contrôles. |
| `space-4` | 16 px | Padding standard, champs et petits groupes. |
| `space-5` | 20 px | Espacement de groupes compacts. |
| `space-6` | 24 px | Padding de cartes, groupes de contenu. |
| `space-8` | 32 px | Séparation entre blocs. |
| `space-10` | 40 px | Séparation de sous-sections. |
| `space-12` | 48 px | Padding de section compact. |
| `space-16` | 64 px | Espacement vertical de section. |
| `space-20` | 80 px | Grandes sections éditoriales. |
| `space-24` | 96 px | Séparation majeure sur grands écrans. |

Règles de composition :
- Espacement interne d’un composant : 4 à 16 px selon la densité.
- Padding d’une carte : 20 à 24 px desktop ; 16 px mobile.
- Espacement entre cartes : 16 à 24 px desktop ; 12 à 16 px mobile.
- Entre titre et introduction : 12 à 16 px.
- Entre introduction et contenu : 24 à 32 px.
- Entre groupes de formulaire : 24 px ; entre label et champ : 8 px.
- Entre sections : 64 à 96 px desktop ; 40 à 64 px mobile.
- Padding horizontal de page : 32 à 48 px desktop, 24 px tablette, 16 à 20 px mobile.
- Largeur maximale du contenu éditorial : 1 280 px ; certaines compositions hero peuvent être plus larges.
- Largeur de lecture des paragraphes : environ 60 à 75 caractères.

### 2.4 Grille et composition

| Format | Grille | Présentation indicative |
|---|---|---|
| Large desktop | 12 colonnes | Hero éditorial ; jusqu’à 4 cartes produits par rangée si elles restent lisibles. |
| Laptop | 12 colonnes | 3 à 4 cartes selon la largeur utile. |
| Tablette paysage | 8 colonnes | 2 à 3 cartes selon le contenu. |
| Tablette portrait | 8 colonnes | 2 cartes. |
| Mobile | 4 colonnes | 2 cartes compactes si lisibles, sinon 1 carte large. |

- Gouttière desktop : 24 px ; tablette : 20 px ; mobile : 16 px.
- Conteneur centré avec largeur maximale de 1 440 px pour les vues larges.
- Sidebar back-office : largeur cible 256 px, repliable ; contenu principal fluide.
- Les compositions asymétriques sont possibles pour les campagnes ; les informations transactionnelles restent simples.
- Les breakpoints sont des repères : les composants doivent s’adapter à la largeur réellement disponible.

### 2.5 Formes, bordures et profondeur

- Rayon petit : 6 px pour les contrôles compacts.
- Rayon standard : 10 px pour champs, boutons et cartes.
- Rayon large : 16 px pour grands panneaux.
- Rayon éditorial : 20 px ponctuellement pour les visuels ou compositions.
- Bordures fines et discrètes ; éviter les contours décoratifs épais.
- Ombres rares, douces et fonctionnelles ; préférer la séparation par fond et espace.
- Les images produits conservent leur ratio et leur cadrage ; ne jamais les étirer.

## 3. Surfaces et effets — Layered Glass

Le glassmorphism sert à créer une hiérarchie de profondeur ; il ne doit pas être appliqué à toute l’interface.

**Usages recommandés :**
- navigation flottante ou sticky ;
- mega-menu ;
- panneau panier latéral ;
- filtres en overlay sur mobile ;
- modales et panneaux contextuels ;
- petites surfaces de campagne.

**À éviter :**
- cartes produits principales ;
- longs blocs de texte et formulaires complexes ;
- surfaces vitrées empilées ;
- éléments dont le contraste dépend fortement du flou.

Règles :
- fond translucide suffisamment opaque ;
- blur modéré ;
- bordure fine et perceptible ;
- ombre douce ;
- contraste vérifié sur les arrière-plans réels ;
- fallback opaque lorsque le blur est indisponible ou désactivé.

Les cartes produits restent majoritairement opaques pour préserver la lecture des photos, des prix et des informations.

## 4. Iconographie, images et médias

- Privilégier les photos réelles des produits commercialisés.
- Ne pas utiliser un visuel générique comme preuve de disponibilité ou d’état réel d’un produit.
- Utiliser des ratios et recadrages cohérents au sein d’une même famille de composants.
- Fournir des textes alternatifs pertinents aux images informatives.
- Optimiser les images avec des formats modernes et des tailles adaptées à l’écran.
- Différer le chargement des médias non essentiels.
- Ne pas retarder l’affichage du titre, du prix ou de l’action principale à cause d’un média lourd.
- Les icônes restent simples, cohérentes et accompagnées d’un libellé lorsque leur sens n’est pas évident.

## 5. Composants et comportements

Chaque composant doit documenter ses variantes, ses états, son comportement clavier, son adaptation mobile et ses règles de contenu.

### 5.1 Boutons
- Primaire : fond orange signal, libellé contrasté après validation WCAG.
- Secondaire : graphite ou bouton contour selon le contexte.
- Tertiaire : lien ou action discrète.
- Hauteur cible : 44 à 48 px ; zone tactile mobile au moins 44 × 44 px.
- Une seule action primaire dominante par bloc.
- États requis : hover, focus-visible, pressed, disabled et loading.

### 5.2 Champs et formulaires
- Hauteur cible : 48 px.
- Label visible, aide et erreur explicites.
- Focus visible et clavier accessible.
- Ne jamais utiliser le placeholder comme seul label.
- Présenter les erreurs près des champs concernés et expliquer comment les corriger.

### 5.3 Navigation
- Announcement bar, si une annonce réelle doit être communiquée.
- Header avec navigation, recherche, devise, compte et panier selon les fonctionnalités activées.
- Mega-menu si le catalogue le justifie.
- Navigation mobile adaptée au petit écran.
- Breadcrumb sur les pages de profondeur.
- Footer avec informations et coordonnées confirmées.

### 5.4 Commerce
- Carte catégorie.
- Carte produit.
- Affichage du prix et de la devise.
- Sélecteur de devise.
- Statut de stock.
- Galerie produit.
- Sélecteur de quantité.
- Ligne de panier.
- Récapitulatif de commande.

Les cartes produits présentent l’image, le nom, une information utile, le prix, la devise, la disponibilité réelle et une action adaptée. Les prix et références utilisent IBM Plex Mono. Ne jamais afficher un prix ou un stock non confirmé.

### 5.5 Feedback et états
- Toast et alert.
- Modal et drawer.
- Skeleton.
- Empty state.
- Error state.
- États de validation.

États obligatoires selon le contexte : chargement, succès, erreur, vide, indisponibilité, validation, accès refusé, perte de connexion et contenu partiel. Les messages expliquent la situation et la prochaine action possible.

### 5.6 Back-office
- Sidebar et navigation stable.
- Page header avec titre et action principale.
- Data table et filter bar.
- Status badge.
- Activity timeline et audit detail.

Le back-office privilégie l’efficacité et la lisibilité : surfaces sobres, densité maîtrisée, tableaux lisibles et actions visibles selon les rôles et permissions. Les actions irréversibles sont confirmées et les modifications sensibles sont traçables.

## 6. Architecture des pages et parcours

### 6.1 Accueil
Ordre de lecture recommandé :
1. Bandeau d’annonce, uniquement si nécessaire.
2. Header principal.
3. Hero showroom avec proposition de valeur claire, CTA et visuel.
4. Accès aux catégories réellement disponibles.
5. Produits mis en avant.
6. Mise en avant éditoriale fondée sur le catalogue réel.
7. Informations de confiance confirmées.
8. Footer.

Le hero peut être asymétrique et intégrer un média riche, mais son texte, son CTA et l’accès au catalogue doivent rester disponibles sans attendre le chargement du média.

### 6.2 Catalogue
- Fil d’Ariane, titre et introduction.
- Nombre de résultats, tri et filtres actifs.
- Sidebar filtres sur desktop.
- Drawer de filtres sur mobile.
- Grille de produits adaptée à la largeur.
- Pagination ou chargement progressif explicite.

Les filtres sont construits uniquement à partir des attributs réellement présents dans le catalogue.

### 6.3 Fiche produit
- Galerie et visuel principal.
- Nom, marque et référence si disponibles.
- Prix et devise.
- Disponibilité réelle.
- Variantes/options si le catalogue en contient.
- Quantité et ajout au panier.
- Description et caractéristiques.
- Garantie et livraison uniquement si confirmées.
- Produits associés seulement s’ils sont pertinents.

Sur desktop, le média et la zone décisionnelle peuvent être côte à côte. Sur mobile, ils deviennent une séquence verticale ; l’action d’achat reste accessible sans masquer les informations essentielles.

### 6.4 Panier
- Articles, options, quantités et prix.
- Modification et suppression claires.
- Une seule devise cohérente.
- Sous-total, frais connus et total.
- CTA vers le checkout.
- État vide utile avec retour au catalogue.

Le mini-panier en drawer peut servir d’aperçu ; la page panier reste disponible pour la vérification complète.

### 6.5 Checkout
Étapes recommandées :
1. Coordonnées.
2. Adresse et vérification de zone.
3. Moyen de paiement réellement disponible.
4. Récapitulatif et confirmation.

Les frais, la devise, le total et les conditions doivent être visibles avant confirmation. Ne pas afficher de fournisseur de paiement avant activation effective.

### 6.6 Confirmation et suivi
Afficher la référence de commande, l’état réel de la commande et du paiement, les prochaines étapes, le récapitulatif et un contact d’assistance confirmé. Ne jamais afficher un succès avant confirmation serveur.

### 6.7 Back-office
Prévoir une navigation latérale, une barre supérieure, un fil d’Ariane, un titre de page, une action principale et un contenu sous forme de tableau, formulaire ou vue détaillée. Les sections fonctionnelles dépendent des fonctionnalités effectivement implémentées.

## 7. Règles de contenu et de confiance

- Tout prix est associé à une devise explicite.
- La devise choisie reste cohérente dans le catalogue, la fiche produit, le panier et le checkout.
- La disponibilité affichée reflète les données réelles.
- Les catégories, marques et filtres proviennent du catalogue administrable.
- Les frais, zones, délais, garanties, conditions et moyens de paiement ne sont affichés que lorsqu’ils sont confirmés.
- Ne jamais annoncer le succès d’une commande ou d’un paiement avant confirmation serveur.
- Les informations essentielles ne sont jamais transmises uniquement par couleur, animation ou effet visuel.

## 8. Motion et micro-interactions

Le mouvement doit expliquer une interaction, donner un retour ou accompagner une transition. Il ne doit jamais retarder une action commerciale.

| Type | Durée de référence | Exemples |
|---|---:|---|
| Micro-feedback | 120–160 ms | Hover, focus, pression et retour d’ajout au panier. |
| Transition de panneau | 180–240 ms | Drawer, panneau latéral et menu. |
| Transition d’élément majeur | 240–320 ms | Transition de page ou grand élément. |

Règles :
- Utiliser principalement `opacity` et `transform`.
- Privilégier des courbes naturelles ; éviter les rebonds systématiques.
- Éviter les animations permanentes et le scroll-jacking.
- Respecter `prefers-reduced-motion` et fournir un état statique.
- Ne jamais bloquer l’ajout au panier, le checkout ou la validation d’un formulaire.
- Afficher immédiatement les changements de prix, stock et statut.

## 9. 3D sélective et performance

La 3D est une amélioration progressive, jamais une dépendance fonctionnelle.

Usages possibles : hero de campagne, présentation de produits vedettes ou visualisation d’un objet lorsqu’un modèle fidèle est disponible.

Ne pas utiliser la 3D pour toutes les cartes, les formulaires, le checkout ou les données transactionnelles. Toute expérience 3D doit :
- disposer d’un fallback image statique ;
- charger après le contenu essentiel ;
- être limitée en poids et en complexité ;
- être utilisable au clavier et au tactile si elle est interactive ;
- être testée sur des appareils modestes ;
- pouvoir être désactivée selon les préférences de mouvement ou les contraintes de performance.

## 10. Responsive

| Breakpoint de conception | Comportement |
|---|---|
| < 768 px | Mobile : navigation compacte, contenu empilé, filtres en panneau. |
| 768–1023 px | Tablette : navigation adaptée, grilles généralement en 2 colonnes. |
| 1024–1439 px | Desktop : sidebar et grilles de 3 colonnes selon l’espace. |
| ≥ 1440 px | Grand écran : contenu centré, grille jusqu’à 4 colonnes. |

Ces seuils sont des repères de conception. Les composants s’adaptent à la largeur réelle disponible, pas uniquement au type d’appareil.

- Aucun scroll horizontal global.
- Les tableaux admin peuvent utiliser un scroll horizontal local ou une présentation adaptée.
- Les filtres latéraux deviennent un drawer sur mobile.
- Les actions principales restent faciles à atteindre.
- Les informations essentielles ne sont pas supprimées pour gagner de la place.

## 11. Accessibilité et qualité

**Cible : WCAG 2.2 AA.**

- Contraste vérifié pour les textes, boutons, états et composants.
- Focus visible et navigation clavier cohérente.
- Labels explicites et persistants.
- Messages d’erreur compréhensibles.
- Alternatives textuelles pertinentes.
- Couleur jamais seule porteuse d’information.
- Vérifier le zoom à 200 %, le reflow et les zones tactiles.
- Les tableaux possèdent des en-têtes sémantiques.
- Les états de chargement et notifications sont annoncés correctement aux technologies d’assistance.
- Respecter `prefers-reduced-motion`.

## 12. Chargement des polices et ressources

Prévoir uniquement les graisses réellement utilisées pour Space Grotesk, Instrument Sans et IBM Plex Mono. Privilégier `font-display: swap`, un préchargement limité aux fichiers critiques et des sous-ensembles si disponibles. Éviter de charger des graisses inutilisées.

Les images doivent être responsives, optimisées et chargées selon leur priorité. Les médias lourds et expériences 3D ne doivent pas retarder le contenu principal.

## 13. Gouvernance et règles d’implémentation

1. Les tokens de ce document sont la source de vérité ; éviter les valeurs CSS isolées.
2. Toute nouvelle couleur, taille ou valeur d’espacement est ajoutée au système et justifiée.
3. Les changements de direction artistique sont consignés dans une décision de design.
4. Un même composant conserve les mêmes conventions visuelles et comportementales sur toutes les pages.
5. Les variantes responsive sont définies au niveau du composant, pas improvisées page par page.
6. Les états de chargement, erreur, vide et succès sont prévus dès la conception.
7. Les données commerciales affichées proviennent des données applicatives réelles.
8. Les effets glass, motion et 3D ne sont jamais nécessaires à la compréhension ou à l’utilisation.
9. Les changements de palette doivent être revus avec les maquettes et les tests de contraste.
10. Cette spécification précède ou accompagne l’application complète du design system dans le frontend ; elle ne prétend pas que tout est déjà codé.

## 14. Livrables de design

- Maquettes desktop, tablette et mobile de l’accueil, catalogue, fiche produit, panier et checkout.
- Maquettes des écrans principaux du back-office.
- Bibliothèque de composants avec variantes et états.
- Tokens documentés et alignés avec l’implémentation.
- Prototype du parcours catalogue → panier → checkout.
- Spécifications responsive et d’accessibilité.
- Motion guidelines et démonstrations.
- Spécification des médias/3D avec fallback et budget de performance.
- Validation du prototype avant intégration.

## 15. Critères d’acceptation

- [ ] La direction visuelle est cohérente sur tous les écrans.
- [ ] La palette et les familles typographiques sont utilisées conformément aux tokens.
- [ ] Les pages prioritaires disposent de maquettes desktop et mobile.
- [ ] Les composants commerce documentent leurs variantes et leurs états.
- [ ] Prix, devise, disponibilité et frais sont compréhensibles.
- [ ] Le glassmorphism ne réduit pas la lisibilité.
- [ ] Les animations sont utiles, courtes et désactivables.
- [ ] Les éléments 3D disposent d’un fallback statique.
- [ ] Le parcours d’achat reste utilisable sans animation ni 3D.
- [ ] Le back-office possède une hiérarchie fonctionnelle adaptée.
- [ ] Les exigences d’accessibilité et de responsive sont vérifiées.
- [ ] Les informations commerciales affichées sont confirmées par les données applicatives.

---

**Document de référence :** `docs/design/DESIGN-SYSTEM.md`  
**Dépôt :** `ArnoldMenes1/ctrl-tech-plateforme`  

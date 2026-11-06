# CTRL-TECH Design System v1.0

> Statut : **direction artistique validée**. Ce document définit les fondations visuelles de la boutique et du back-office. Il ne signifie pas que tous les styles sont déjà intégrés au code.

## 1. Identité

- **Nom de la direction :** Precision Retail
- **Positionnement :** commerce électronique spécialisé dans les appareils électroniques performants, avec une expérience premium, éditoriale et technique.
- **Intention :** associer la précision d'un catalogue spécialisé, la chaleur d'un showroom contemporain et la lisibilité d'un outil professionnel.
- **À éviter :** dégradés bleu-violet génériques, néons, effets cyberpunk, décorations gratuites, cartes uniformes, animations excessives et interfaces surchargées.

## 2. Palette chromatique

| Token | Nom | Hex | Usage |
|---|---|---:|---|
| `color.graphite` | Graphite profond | `#14232B` | Navigation sombre, footer, titres sur fond clair, sidebar admin |
| `color.ivory` | Ivoire minéral | `#F3F0E8` | Fond principal, surfaces éditoriales |
| `color.signal` | Orange signal | `#D96B45` | CTA principal, accent, promotions validées |
| `color.sage` | Sauge technique | `#B9C9B8` | États positifs secondaires, détails et badges |
| `color.white` | Blanc optique | `#FFFFFF` | Cartes, champs et surfaces de contenu |
| `color.titanium` | Gris titane | `#69777B` | Texte secondaire, métadonnées |
| `color.champagne` | Champagne | `#E8C77A` | Accent premium ponctuel |

### Règles d'utilisation

- L'ivoire est le fond éditorial dominant ; le blanc optique sert à détacher les surfaces fonctionnelles.
- Le graphite structure la navigation et la hiérarchie.
- L'orange signal est réservé aux actions importantes et aux accents. Il ne doit pas envahir les pages.
- La sauge et le champagne restent secondaires.
- Ne pas communiquer un état uniquement par la couleur : ajouter un libellé ou une icône.
- Vérifier les contrastes réels WCAG 2.2 AA, notamment pour les petits textes et les boutons orange. Si un couple ne passe pas, adapter la couleur du texte ou la nuance d'usage sans modifier arbitrairement la palette de marque.

## 3. Typographie

| Rôle | Famille | Graisses | Usage |
|---|---|---|---|
| Titres | **Space Grotesk** | 500, 600, 700 | Titres éditoriaux, titres de page, intertitres |
| Interface et lecture | **Instrument Sans** | 400, 500, 600, 700 | Paragraphes, navigation, formulaires, boutons, descriptions |
| Données techniques | **IBM Plex Mono** | 400, 500, 600 | Prix, SKU, références, mesures, spécifications et données tabulaires |

### Échelle typographique de départ

| Token | Taille | Interligne | Usage |
|---|---:|---:|---|
| `type.display` | 56 px | 1.05 | Hero desktop, très grands titres |
| `type.h1` | 44 px | 1.10 | Titre principal desktop |
| `type.h2` | 32 px | 1.15 | Sections majeures |
| `type.h3` | 24 px | 1.25 | Sous-sections |
| `type.h4` | 20 px | 1.30 | Titres de cartes et panneaux |
| `type.body-lg` | 18 px | 1.55 | Introduction et texte éditorial |
| `type.body` | 16 px | 1.50 | Texte courant |
| `type.body-sm` | 14 px | 1.45 | Métadonnées et descriptions secondaires |
| `type.caption` | 12 px | 1.40 | Légendes, aides et mentions secondaires |

Sur mobile, réduire les grands titres de manière fluide : display 40 px maximum, H1 34 px, H2 28 px. Éviter les textes fonctionnels inférieurs à 12 px.

## 4. Échelle d'espacement

**Base : 4 px.** Tous les espacements de l'interface doivent être choisis dans cette échelle ou être justifiés par une contrainte de composant. Ne pas ajouter des valeurs arbitraires au cas par cas.

| Token | Valeur | Usage indicatif |
|---|---:|---|
| `space-0` | 0 px | Aucun espacement |
| `space-1` | 4 px | Écart icon/label, micro-ajustement |
| `space-2` | 8 px | Éléments très liés, badges |
| `space-3` | 12 px | Espacement compact entre contrôles |
| `space-4` | 16 px | Padding standard, champs et petits groupes |
| `space-5` | 20 px | Espacement de groupes compacts |
| `space-6` | 24 px | Padding de cartes, groupes de contenu |
| `space-8` | 32 px | Séparation entre blocs |
| `space-10` | 40 px | Séparation de sous-sections |
| `space-12` | 48 px | Padding de section compact |
| `space-16` | 64 px | Espacement vertical de section |
| `space-20` | 80 px | Grandes sections éditoriales |
| `space-24` | 96 px | Séparation majeure sur grands écrans |

### Règles de composition et espacements

- **Espacement interne d'un composant :** 4 à 16 px selon la densité.
- **Padding d'une carte :** 20 à 24 px desktop ; 16 px mobile.
- **Espacement entre cartes :** 16 à 24 px desktop ; 12 à 16 px mobile.
- **Entre titre et introduction :** 12 à 16 px.
- **Entre introduction et contenu :** 24 à 32 px.
- **Entre groupes de formulaire :** 24 px ; entre label et champ : 8 px.
- **Entre sections d'une page :** 64 à 96 px desktop ; 40 à 64 px mobile.
- **Padding horizontal de page :** 32 à 48 px desktop, 24 px tablette, 16 à 20 px mobile.
- **Largeur maximale du contenu éditorial :** 1 280 px ; certaines compositions hero peuvent utiliser une largeur plus large.
- **Largeur de lecture des paragraphes :** 60 à 75 caractères environ.
- Les espacements doivent créer une hiérarchie visible : éléments liés rapprochés, sections distinctes nettement séparées.

### Grille

- Grille desktop : 12 colonnes.
- Tablette : 8 colonnes.
- Mobile : 4 colonnes.
- Gouttière desktop : 24 px ; tablette : 20 px ; mobile : 16 px.
- Conteneur centré avec largeur maximale de 1 440 px pour les vues larges.
- Catalogue : 4 colonnes sur grand desktop, 3 sur desktop standard, 2 sur tablette et mobile large, 1 ou 2 sur petit mobile selon lisibilité.
- Sidebar back-office : largeur cible 256 px, repliable ; contenu principal fluide.

## 5. Formes, bordures et profondeur

- Rayon petit : 6 px pour les contrôles compacts.
- Rayon standard : 10 px pour champs, boutons et cartes.
- Rayon large : 16 px pour grands panneaux.
- Rayon éditorial : 20 px ponctuellement pour les visuels ou compositions.
- Bordures fines et discrètes ; éviter les contours décoratifs épais.
- Ombres rares, douces et fonctionnelles ; préférer la séparation par fond et espace.
- Les boutons doivent avoir des états hover, focus-visible, pressed, disabled et loading.
- Les images produits doivent conserver leur ratio et leur cadrage ; ne pas étirer les visuels.

## 6. Composants et comportements

### Boutons
- Primaire : fond orange signal, libellé contrasté après validation WCAG.
- Secondaire : graphite, ou bouton contour selon le contexte.
- Tertiaire : lien ou action discrète.
- Hauteur cible : 44 à 48 px ; zone tactile mobile au moins 44 × 44 px.
- Une seule action primaire dominante par bloc.

### Champs
- Hauteur cible 48 px.
- Label visible, aide et erreur explicites.
- Focus visible et clavier accessible.
- Ne pas utiliser le placeholder comme seul label.

### Cartes produit
- Image, catégorie ou marque si utile, nom, configuration courte, prix, disponibilité et actions.
- Prix et références en IBM Plex Mono.
- Ne jamais afficher une disponibilité ou un prix non confirmé.
- Les actions secondaires ne doivent pas concurrencer l'ouverture de la fiche.

### États
- Chargement : skeleton à dimensions proches du contenu final.
- Vide : explication et prochaine action utile.
- Erreur : message compréhensible et possibilité de réessayer.
- Succès : confirmation textuelle claire.
- Indisponible : statut visible et achat désactivé.

## 7. Motion et micro-interactions

- Animations sobres, rapides et fonctionnelles.
- Durées de référence : 120–160 ms pour feedback, 180–240 ms pour transitions de panneaux, 240–320 ms pour transitions de page ou de grands éléments.
- Utiliser des courbes d'accélération naturelles ; éviter les rebonds systématiques.
- Prévoir `prefers-reduced-motion`.
- Ne jamais retarder une action commerciale essentielle par une animation.

## 8. Responsive

| Breakpoint de conception | Comportement |
|---|---|
| < 768 px | Mobile : navigation compacte, contenu empilé, filtres en panneau |
| 768–1023 px | Tablette : navigation adaptée, grilles 2 colonnes |
| 1024–1439 px | Desktop : sidebar et grilles 3 colonnes selon espace |
| ≥ 1440 px | Grand écran : contenu centré, grille jusqu'à 4 colonnes |

Ces seuils sont des repères de conception ; les composants doivent s'adapter à la largeur réelle disponible, pas uniquement au type d'appareil.

## 9. Accessibilité et qualité

- Cible : WCAG 2.2 AA.
- Contraste, focus visible, navigation clavier, libellés, messages d'erreur et alternatives textuelles.
- Couleur jamais seule porteuse d'information.
- Vérifier zoom à 200 %, reflow et zones tactiles.
- Les tableaux doivent avoir des en-têtes sémantiques.
- Les états de chargement et notifications doivent être annoncés correctement aux technologies d'assistance.

## 10. Chargement des polices

Prévoir les trois familles avec les graisses réellement utilisées. Privilégier une stratégie de chargement performante (font-display: swap, préchargement limité aux fichiers critiques, sous-ensembles si disponibles). Éviter de charger toutes les graisses si elles ne sont pas utilisées.

## 11. Gouvernance

- Les tokens sont la source de vérité ; éviter les valeurs CSS isolées.
- Toute nouvelle couleur, taille ou valeur d'espacement doit être ajoutée au système et justifiée.
- Les changements de direction artistique doivent être consignés dans une décision de design.
- La palette et les familles typographiques sont validées ; les nuances d'accessibilité pourront être ajustées uniquement si les tests de contraste l'exigent.
- Cette spécification précède l'application complète du design system dans le frontend.

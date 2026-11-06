# CTRL-TECH — socle applicatif

## Démarrage local

- Node.js 20+
- `npm install`
- `npm run dev`

## Contrôles

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## État de cette première livraison

- Boutique React + TypeScript + Vite initialisée.
- Accueil responsive, navigation, catalogue filtrable, fiche produit, panier local de démonstration.
- Catalogue de travail repris du document Catalogue 2026.
- Les prix sont signalés comme indicatifs. Aucune disponibilité, commande, garantie détaillée ou livraison n'est confirmée.
- Les visuels utilisent des images distantes temporaires ; ils devront être remplacés par des photos officielles autorisées.

## Direction artistique

- Référence : `docs/design/DESIGN-SYSTEM.md` — Precision Retail.
- Palette appliquée : Graphite `#14232B`, Ivoire `#F3F0E8`, Orange signal `#D96B45`, Sauge `#B9C9B8`, Blanc `#FFFFFF`, Titane `#69777B`, Champagne `#E8C77A`.
- Typographies : Space Grotesk, Instrument Sans et IBM Plex Mono.
- Le socle CSS inclut les tokens d'espacement, les ajustements responsive, les états de focus clavier et `prefers-reduced-motion`.
- Les vues présentes dans ce frontend sont l'accueil, le catalogue, la fiche produit, le panier et les états 404. Le back-office n'est pas encore implémenté dans cette branche.

## Architecture cible à compléter

Le frontend ne se connecte jamais directement à PostgreSQL. Les endpoints métier seront ajoutés sous `api/` et utiliseront Neon/Drizzle côté serveur. Clerk sera intégré après configuration des clés et des domaines autorisés. Les fonctions checkout et back-office restent désactivées tant que les règles commerciales et les environnements ne sont pas validés.

## Variables d'environnement

Copier `.env.example` vers `.env.local` pour le développement. Ne jamais committer de secrets. Les clés privées doivent être configurées dans Vercel, côté serveur uniquement. `DATABASE_URL` est réservé au rôle applicatif ; `MIGRATION_DATABASE_URL` est réservé aux opérations de migration locales et ne doit pas être exposé dans Preview ou Production.


## Durcissement commerce — branche feat/storefront-commerce-hardening

- Le catalogue public utilise désormais les filtres API (recherche et catégorie), avec fallback de démonstration si l'API est indisponible.
- Les fiches produit peuvent charger une référence publiée depuis Neon par identifiant UUID ; les références de démonstration restent consultables localement.
- L'API catalogue valide les paramètres, borne la pagination et n'expose que les produits publiés et variantes actives.
- Les contraintes d'inventaire du schéma Drizzle sont alignées avec la migration SQL versionnée.
- Le panier reste un panier local indicatif : aucune commande, réservation de stock ou opération de paiement n'est créée.
- Le back-office et les écritures restent bloqués jusqu'à la vérification de session Clerk et des rôles côté serveur.

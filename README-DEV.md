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

## Architecture cible à compléter

Le frontend ne se connecte jamais directement à PostgreSQL. Les endpoints métier seront ajoutés sous `api/` et utiliseront Neon/Drizzle côté serveur. Clerk sera intégré après configuration des clés et des domaines autorisés. Les fonctions checkout et back-office restent désactivées tant que les règles commerciales et les environnements ne sont pas validés.

## Variables d'environnement

Copier `.env.example` vers `.env.local` pour le développement. Ne jamais committer de secrets. Les clés privées doivent être configurées dans Vercel, côté serveur uniquement. `DATABASE_URL` est réservé au rôle applicatif ; `MIGRATION_DATABASE_URL` est réservé aux opérations de migration locales et ne doit pas être exposé dans Preview ou Production.

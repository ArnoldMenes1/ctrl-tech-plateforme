# ADR-001 — Socle applicatif CTRL-TECH

- **Statut :** accepté pour le MVP technique
- **Date :** 2026-11-05
- **Contexte :** démarrer une boutique web maintenable avec un frontend rapide, une API séparée et des services managés.

## Décision

- React 18 + TypeScript strict + Vite pour l'application web.
- React Router pour la navigation.
- Fonctions API Vercel sous `api/`.
- Neon PostgreSQL sera accessible uniquement depuis les fonctions serveur.
- Clerk sera le fournisseur d'identité ; les permissions métier seront contrôlées côté serveur.
- Les environnements Preview et Production utiliseront des secrets et bases distincts.

## Conséquences

- Le frontend ne reçoit jamais `DATABASE_URL` ni `CLERK_SECRET_KEY`.
- Les opérations de commande devront être transactionnelles et revalider prix et stock côté serveur.
- Les visuels du catalogue sont provisoires et devront être remplacés par des médias autorisés du magasin.
- Les prix issus du catalogue 2026 sont affichés comme indicatifs, non comme engagement commercial.

## Hors périmètre de cette décision

Cette décision ne confirme ni la configuration des comptes Vercel/Neon/Clerk, ni le domaine, ni les règles de paiement, livraison, garantie ou retour.

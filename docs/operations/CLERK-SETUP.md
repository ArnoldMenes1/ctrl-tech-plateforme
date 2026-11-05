# Configuration Clerk — CTRL-TECH

Le frontend est prêt à utiliser Clerk dès que la clé publique est configurée. Sans clé, le site reste utilisable en mode catalogue et affiche « Espace client ».

## 1. Créer l'application Clerk

Créer une application dédiée au projet CTRL-TECH dans le tableau de bord Clerk.

- Nom conseillé : `CTRL-TECH`.
- Méthode de connexion initiale : email.
- Ajouter les fournisseurs sociaux uniquement après décision métier.
- Activer la MFA pour les comptes internes privilégiés.
- Ajouter les URLs Preview et Production aux origines/domaines autorisés.

## 2. Variables Vercel

Configurer les variables dans le projet Vercel `ctrl-tech-plateforme` :

| Variable | Usage | Exposition |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Initialise Clerk dans le navigateur | Publique |
| `CLERK_SECRET_KEY` | Vérification des sessions côté API | Secrète, serveur uniquement |

La clé publique doit être configurée pour Preview et Production. La clé secrète ne doit jamais porter le préfixe `VITE_`, ni apparaître dans Git, les logs ou le navigateur.

## 3. Rôles applicatifs

Rôles prévus :
- `customer`
- `operator`
- `catalog_manager`
- `admin`
- `super_admin`

Les rôles privilégiés doivent être attribués côté serveur par un administrateur autorisé. Ne jamais accepter un rôle transmis par un formulaire ou une requête cliente comme preuve d'autorisation.

## 4. Après configuration

1. Ajouter les variables dans Vercel.
2. Relancer un déploiement Preview.
3. Vérifier inscription, connexion, déconnexion et persistance de session.
4. Implémenter puis tester la vérification serveur du JWT et le RBAC avant d'ouvrir les routes d'administration.

## État actuel

- Provider Clerk conditionnel intégré dans `src/main.tsx`.
- Boutons de connexion et menu utilisateur conditionnels dans l'en-tête.
- Aucune clé réelle n'est présente dans le dépôt.
- Les routes d'administration et endpoints privés restent à construire et à protéger côté serveur.

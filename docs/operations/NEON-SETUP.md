# Configuration Neon — CTRL-TECH

## 1. Créer le projet

1. Créer un projet PostgreSQL dans Neon.
2. Choisir une région proche de l'application et conserver le nom de base généré.
3. Créer deux chaînes de connexion distinctes :
   - une chaîne applicative pour l'exécution de l'API ;
   - une chaîne propriétaire pour les migrations.
4. Utiliser les chaînes poolées pour le trafic applicatif serverless lorsque Neon le recommande.

## 2. Variables

Dans Vercel > projet `ctrl-tech-plateforme` > Settings > Environment Variables :

| Variable | Environnements | Usage |
|---|---|---|
| `DATABASE_URL` | Preview et Production | Connexion runtime de l'API, rôle SQL à privilèges minimaux |
| `MIGRATION_DATABASE_URL` | Local uniquement | Exécuter les migrations avec un rôle propriétaire |

Ne pas préfixer ces variables par `VITE_`. Ne jamais les ajouter au dépôt, à un commit, à une capture d'écran ou au code frontend.

Pour le développement local, copier `.env.example` vers `.env.local`, puis renseigner les valeurs localement. Ne pas partager les chaînes de connexion dans une conversation.

## 3. Première migration

Après configuration locale :

```bash
npm install
npm run db:migrate
```

Exécuter les migrations avec `MIGRATION_DATABASE_URL`, jamais avec le rôle runtime. Vérifier ensuite les tables et index dans Neon.

## 4. Déploiement

1. Ajouter `DATABASE_URL` dans Preview.
2. Déployer la branche backend.
3. Tester `/api/health` et `/api/products`.
4. Ajouter `DATABASE_URL` à Production seulement après validation de Preview.
5. Exécuter les migrations de production selon une procédure contrôlée avant de basculer le trafic.

## 5. Sécurité

- Ne jamais exposer le mot de passe SQL dans le navigateur.
- Utiliser un rôle runtime limité aux opérations nécessaires.
- Garder les migrations hors des fonctions HTTP.
- Faire tourner les secrets en cas d'exposition.
- Ne pas considérer un endpoint health comme une preuve que les données métier sont prêtes.

# Neon Managed Better Auth — CTRL-TECH

## Environnements

Le projet Neon `Ctrl-Tech` possède deux branches utilisées par l'application :

| Environnement | Branche Neon | Usage |
|---|---|---|
| Preview / développement | `development` | Comptes et tests isolés |
| Production | `production` | Comptes clients réels après mise en ligne |

Chaque branche possède son propre endpoint Neon Auth. Ne pas mélanger les URLs.

## Frontend Vite

Variable publique à configurer dans Vercel (et dans `.env.local` en local) :

```env
VITE_NEON_AUTH_URL=https://<endpoint-de-la-branche>.neonauth.<region>.aws.neon.tech/neondb/auth
```

Le client utilise le SDK officiel `@neondatabase/auth` et les méthodes Better Auth `signUp.email`, `signIn.email`, `getSession` et `signOut`.

Ne jamais placer une clé secrète ou une URL de connexion PostgreSQL dans une variable `VITE_*`.

## Domaines autorisés

Ajouter chaque origine exacte à la liste des domaines de confiance de la branche Neon Auth concernée :

- `http://localhost:5173` pour le développement local (localhost est déjà autorisé sur le projet).
- URL Vercel Preview stable de la branche `feat/storefront-foundation`.
- Domaine de production une fois validé.

Une URL Preview de branche peut changer si le projet Vercel est recréé. Vérifier le domaine réellement fourni par Vercel avant de l'ajouter.

## Vérifications à effectuer

1. Créer un compte avec une adresse e-mail de test.
2. Vérifier le code e-mail si la vérification est requise.
3. Se déconnecter puis se reconnecter.
4. Recharger la page et vérifier la persistance de session.
5. Tester l'accès à `/compte` sans session.
6. Vérifier qu'aucun endpoint privé ou secret n'est exposé au navigateur.

## Emails en production

Le SMTP partagé Neon convient au développement. Avant d'ouvrir les inscriptions au public, configurer un expéditeur SMTP de marque et vérifier les modèles, la délivrabilité et les domaines d'envoi.

## Stockage objet

Le bucket `assets` existe sur Neon Object Storage avec un accès privé. Les uploads et téléchargements privés devront passer par l'API serveur et des URL présignées de courte durée. Les clés S3 ne doivent jamais être intégrées au bundle frontend.

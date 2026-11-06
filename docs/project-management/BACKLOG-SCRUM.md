# Backlog Scrum — CTRL-TECH E-Commerce

> Référence de pilotage du développement. Le classeur Excel détaillé joint à la conversation contient les 55 user stories, critères d'acceptation, priorités, story points, dépendances, épics, sprints, risques et décisions à confirmer.

## Méthode

- Product Backlog organisé en 10 épics et 55 user stories.
- Priorisation MoSCoW : Must / Should / Could / Won't.
- Estimation relative en Story Points (pas en heures).
- Sprints proposés : Sprint 0 à Sprint 9. Leur durée et leur capacité restent à fixer avec l'équipe.
- Les statuts initiaux sont « À faire ».
- Une story ne passe à « Terminé » qu'après validation de ses critères d'acceptation.

## Plan des sprints

| Sprint | Thème | Stories | Livrable |
|---|---|---|---|
| 0 | Cadrage métier | CT-001 à CT-006 | Cahier des charges, règles commerciales et MVP validés |
| 1 | UX/UI et design system | CT-007 à CT-011 | Parcours, maquettes et composants de référence |
| 2 | Fondations et preview | CT-012 à CT-016 | React/TypeScript initialisé, CI et Preview Vercel |
| 3 | Base de données et API | CT-017 à CT-022 | Neon/Drizzle et API initiale testés |
| 4 | Authentification et sécurité | CT-023 à CT-028 | Clerk, RBAC et protections vérifiés |
| 5 | Boutique publique | CT-029 à CT-034 | Catalogue, recherche, fiches et panier |
| 6 | Checkout et commandes | CT-035 à CT-039 | Commande de bout en bout en environnement de test |
| 7 | Back-office | CT-040 à CT-045 | Gestion catalogue, médias, stocks et commandes |
| 8 | Tests et recette | CT-046 à CT-050 | Recette technique et métier acceptée |
| 9 | Préproduction et lancement | CT-051 à CT-055 | Production prête, release et monitoring |

## Épopées

1. **EP-01 — Cadrage métier :** CT-001 à CT-006.
2. **EP-02 — UX/UI & design system :** CT-007 à CT-011.
3. **EP-03 — Socle technique :** CT-012 à CT-016.
4. **EP-04 — Données & API :** CT-017 à CT-022.
5. **EP-05 — Authentification & sécurité :** CT-023 à CT-028.
6. **EP-06 — Boutique publique :** CT-029 à CT-034.
7. **EP-07 — Commandes & checkout :** CT-035 à CT-039.
8. **EP-08 — Back-office :** CT-040 à CT-045.
9. **EP-09 — Qualité & recette :** CT-046 à CT-050.
10. **EP-10 — Production & lancement :** CT-051 à CT-055.

## Référentiel des stories

| ID | Sprint | User story (résumé) |
|---|---|---|
| CT-001 | 0 | Valider le nom commercial, le logo et les coordonnées |
| CT-002 | 0 | Valider le catalogue initial et les références publiables |
| CT-003 | 0 | Confirmer les prix et la devise |
| CT-004 | 0 | Définir garantie, retours et SAV |
| CT-005 | 0 | Définir livraison, retrait et paiement |
| CT-006 | 0 | Valider le périmètre MVP et les critères d'acceptation |
| CT-007 | 1 | Concevoir les parcours et l'arborescence |
| CT-008 | 1 | Définir l'identité visuelle |
| CT-009 | 1 | Créer les composants UI réutilisables |
| CT-010 | 1 | Concevoir les états de chargement, vide, erreur et succès |
| CT-011 | 1 | Vérifier l'accessibilité et le responsive |
| CT-012 | 2 | Initialiser React, Vite et TypeScript strict |
| CT-013 | 2 | Structurer frontend, API et packages partagés |
| CT-014 | 2 | Configurer lint, formatage et tests |
| CT-015 | 2 | Connecter GitHub à Vercel et générer un Preview |
| CT-016 | 2 | Mettre en place la CI GitHub |
| CT-017 | 3 | Créer les environnements Neon isolés |
| CT-018 | 3 | Définir le schéma Drizzle du catalogue |
| CT-019 | 3 | Versionner et tester les migrations |
| CT-020 | 3 | Construire l'API avec validation serveur |
| CT-021 | 3 | Gérer le stock et les mouvements |
| CT-022 | 3 | Conserver l'instantané des lignes de commande |
| CT-023 | 4 | Intégrer Clerk pour l'inscription et la connexion |
| CT-024 | 4 | Implémenter les rôles et permissions RBAC |
| CT-025 | 4 | Renforcer les comptes privilégiés avec MFA |
| CT-026 | 4 | Protéger l'API contre les abus et attaques courantes |
| CT-027 | 4 | Minimiser et encadrer les données personnelles |
| CT-028 | 4 | Garantir l'isolation des données entre clients |
| CT-029 | 5 | Construire l'accueil et les catégories |
| CT-030 | 5 | Ajouter recherche, filtres et tri |
| CT-031 | 5 | Construire les fiches produits détaillées |
| CT-032 | 5 | Créer un panier persistant |
| CT-033 | 5 | Publier les pages d'information et conditions |
| CT-034 | 5 | Mettre en place le SEO technique |
| CT-035 | 6 | Collecter les coordonnées et le mode de réception |
| CT-036 | 6 | Proposer les moyens de paiement validés |
| CT-037 | 6 | Créer les commandes de façon atomique |
| CT-038 | 6 | Confirmer les paiements et historiser les statuts |
| CT-039 | 6 | Permettre au client de suivre ses commandes |
| CT-040 | 7 | Gérer les produits, variantes, marques et catégories |
| CT-041 | 7 | Gérer les images et médias produits |
| CT-042 | 7 | Traiter les commandes depuis le back-office |
| CT-043 | 7 | Gérer les stocks et les alertes |
| CT-044 | 7 | Gérer les utilisateurs internes et leurs rôles |
| CT-045 | 7 | Afficher les indicateurs commerciaux |
| CT-046 | 8 | Automatiser les tests E2E des parcours critiques |
| CT-047 | 8 | Auditer accessibilité et responsive |
| CT-048 | 8 | Optimiser les performances |
| CT-049 | 8 | Réaliser la revue de sécurité |
| CT-050 | 8 | Faire valider la recette métier |
| CT-051 | 9 | Configurer les domaines et secrets de production |
| CT-052 | 9 | Tester sauvegarde et restauration |
| CT-053 | 9 | Importer le catalogue validé |
| CT-054 | 9 | Publier une release et préparer le rollback |
| CT-055 | 9 | Mettre en place le monitoring post-lancement |

## État réel de l'implémentation — 05 novembre 2026

| Story | État | Preuve / limite |
|---|---|---|
| CT-012 | Terminé | React, TypeScript strict et Vite initialisés |
| CT-013 | En cours | Frontend et API séparés ; packages partagés à structurer |
| CT-014 | Terminé | ESLint, TypeScript, Vitest et scripts de build configurés |
| CT-015 | En cours | Projet Vercel lié au dépôt ; première Preview prête, dernière version en construction |
| CT-016 | Terminé | GitHub Actions : typecheck, lint, tests et build validés sur le premier socle |
| CT-017 | En cours | Projet Neon créé ; branches `main` et `development`, isolation Preview à finaliser |
| CT-018 | Terminé | Schéma initial catalogue, variantes, médias et inventaire créé |
| CT-019 | En cours | Migration SQL versionnée et appliquée sur la branche development ; journal de migrations à formaliser |
| CT-020 | En cours | Endpoint public de lecture du catalogue ajouté ; validation et tests API à compléter |
| CT-021 | En cours | Modèle d'inventaire défini ; mouvements et opérations métier à implémenter |
| CT-022 | À faire | Instantané des lignes de commande à construire avec le module commandes |
| CT-023 | En cours | Provider Clerk et actions de connexion intégrés ; clés et tests de session à configurer |

Les autres stories restent à faire. Les états ci-dessus sont fondés sur les commits et ressources effectivement créés, pas sur une estimation.

## Definition of Done

Une story est terminée lorsque :

- les critères d'acceptation sont satisfaits ;
- le code est formaté, linté et TypeScript sans erreur ;
- les tests pertinents passent ;
- les contrôles de sécurité et d'autorisation sont vérifiés ;
- les états UX et le responsive sont traités ;
- les migrations et la documentation sont à jour si nécessaire ;
- la Preview Vercel liée à la PR a été vérifiée ;
- la revue est approuvée.

## Points métier bloquants

Avant d'activer le checkout et de publier le catalogue, CTRL-TECH doit confirmer les références, prix, quantités, garanties, retours, paiements, livraison, domaine et responsables du back-office.

## Règle de gouvernance

Chaque story doit être créée ou suivie comme issue GitHub avec son identifiant CT-xxx, associée à une PR et à une Preview Vercel si elle modifie l'application. Les story points restent des estimations initiales à recalibrer après le premier sprint.

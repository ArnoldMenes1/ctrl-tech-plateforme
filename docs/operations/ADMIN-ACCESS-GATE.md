# CTRL-TECH — prérequis de sécurité du back-office

## État actuel

Le back-office n'est pas exposé dans l'interface. C'est volontaire : Clerk est actuellement préparé côté navigateur, mais la vérification des sessions et des rôles côté API n'est pas encore livrée. Un contrôle React ou une donnée de rôle dans le navigateur ne protège pas les données.

## Conditions obligatoires avant activation

- [ ] Ajouter et configurer le SDK Clerk côté serveur.
- [ ] Vérifier cryptographiquement le jeton de session sur chaque endpoint privé.
- [ ] Définir les rôles autorisés : `operator`, `catalog_manager`, `admin`, `super_admin`.
- [ ] Attribuer les rôles exclusivement depuis une action serveur autorisée.
- [ ] Implémenter un middleware/guard serveur avec refus par défaut.
- [ ] Contrôler l'autorisation au niveau de chaque ressource et de chaque action.
- [ ] Activer MFA pour les comptes privilégiés.
- [ ] Journaliser les actions sensibles sans enregistrer de secrets.
- [ ] Tester les accès anonymes, les rôles insuffisants et les accès inter-comptes.
- [ ] Valider la configuration Clerk et les secrets séparément en Preview et Production.

## Périmètre de la première interface admin

1. Tableau de bord : indicateurs issus de l'API, sans données fictives présentées comme réelles.
2. Catalogue : création, modification, archivage et publication de produits/variantes.
3. Inventaire : mouvements justifiés, quantités disponibles et seuils d'alerte.
4. Commandes : consultation et transitions d'état autorisées côté serveur.
5. Comptes et rôles : réservé aux administrateurs autorisés, avec journal d'audit.

## Règle de livraison

Aucun formulaire d'écriture, endpoint de mutation, gestion de commande ou modification de stock ne doit être activé avant que toutes les conditions de sécurité ci-dessus soient vérifiées. Le front-end ne remplace jamais l'autorisation serveur.

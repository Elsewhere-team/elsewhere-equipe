---
name: nouvelle-fonctionnalite
description: Coder un ticket d'Elsewhere (équipe) de bout en bout (test d'abord, puis couches données → service → contrôleur → route, puis interface). À utiliser quand un membre de l'équipe demande d'implémenter un ticket ELT ou une user story.
---

# Coder une nouvelle fonctionnalité

## Avant de coder
1. Lire le ticket `ELT-<numéro>` dans Linear et la story correspondante dans `docs/prd.md`. Si aucun ticket n'existe, le signaler et proposer de le créer. Tant que `docs/prd.md` n'existe pas, le ticket fait référence.
2. Vérifier que le ticket appartient bien à l'humain (il en est responsable dans Linear) et repérer le domaine concerné dans `docs/equipe.md`. Si le travail déborde sur le domaine d'un autre membre, le signaler avant de commencer.
3. Reformuler en trois phrases ce que la fonctionnalité doit faire et ses critères d'acceptation. Attendre l'accord de l'humain.
4. Lister les fichiers qui seront créés ou modifiés, couche par couche, et signaler ceux qui sont partagés (voir `CONTRIBUTING.md`).
5. Vérifier qu'on est dans le worktree du ticket, sur la branche au nom proposé par Linear (`<pseudo>/elt-<numéro>-<titre>`), partie de `main` à jour.

## Pendant
6. Écrire d'abord les tests qui traduisent les critères d'acceptation, et vérifier qu'ils échouent.
7. Coder dans l'ordre : accès aux données → service → contrôleur → route → interface React, dans le dossier du domaine.
8. Respecter le contrat d'API (`docs/contrat-api.md`). S'il faut le changer, s'arrêter : c'est une PR dédiée, à annoncer à l'équipe.
9. Valider toute entrée côté Express. Vérifier les droits d'accès dans le service, jamais seulement dans l'interface.
10. Si un changement de base est nécessaire, ne pas écrire la migration soi-même : demander au responsable de la base (voir `docs/equipe.md`).
11. Après chaque couche, expliquer en quelques phrases simples ce qui a été fait et pourquoi.

## Fin
12. Lancer tous les tests ; ils doivent passer.
13. Enchaîner avec le skill `relecture-avant-pr`.

## Cas particuliers
- Si le ticket sort du périmètre du PRD : s'arrêter et demander une décision, à écrire dans `docs/decisions/`.
- Si une solution demande une bibliothèque nouvelle : expliquer pourquoi et demander l'accord avant de l'installer. C'est un changement de `package.json`, donc un fichier partagé.

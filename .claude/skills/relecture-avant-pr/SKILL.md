---
name: relecture-avant-pr
description: Relire un changement d'Elsewhere (équipe) avant d'ouvrir une pull request, ou relire la pull request d'un autre membre. À utiliser avant chaque PR et à chaque demande de relecture.
---

# Relecture avant pull request

## Préparer
1. Récupérer `main` à jour et l'intégrer à la branche. Résoudre les conflits avec l'auteur des lignes concernées si elles ne sont pas les siennes.
2. Afficher le diff complet par rapport à `main`.

## Vérifier, dans cet ordre
3. **Périmètre** : chaque fichier modifié est-il nécessaire au ticket ? Lister ceux qui ne le sont pas (reformatage, renommage, nettoyage par un agent) et proposer de les retirer.
4. **Fichiers partagés** (liste dans `CONTRIBUTING.md`) : s'il y en a, vérifier que leur responsable a été prévenu.
5. **Critères d'acceptation** du ticket Linear : les reprendre un par un et dire, pour chacun, ce qui le prouve (test, écran, commande).
6. **Sécurité** : entrées validées côté Express, droits vérifiés dans le service, requêtes SQL paramétrées, aucun secret ni donnée personnelle réelle dans le diff.
7. **Tests** : ils existent pour les critères d'acceptation et passent.
8. **Lisibilité** : commentaires en français en tête de fichier et de fonction, nommage conforme à `CONTRIBUTING.md`, aucun doublon d'une fonction déjà présente dans `shared/`.
9. **Principes produit** (`AGENTS.md`) : en particulier, jamais de faux titre.

## Conclure
10. Rendre un verdict court : prêt, prêt après corrections listées, ou à reprendre.
11. Si on relit sa propre PR : proposer le titre (format des commits) et la description selon `.github/pull_request_template.md`, cases cochées seulement si elles sont vraies.
12. Si on relit la PR d'un autre : rédiger les remarques de façon factuelle, une par point, en distinguant ce qui bloque la fusion de ce qui est une suggestion.

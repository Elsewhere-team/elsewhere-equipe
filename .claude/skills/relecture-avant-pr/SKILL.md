---
name: relecture-avant-pr
description: Relire un changement d'Elsewhere (équipe) avant d'ouvrir une pull request, ou relire la pull request d'un autre membre : diff complet, sécurité, tests, conventions, Definition of Done case par case, rapport par niveau de gravité. À utiliser avant chaque PR et à chaque demande de relecture.
---

# Relecture avant pull request

Objectif : aucune pull request n'est ouverte ni fusionnée sans que tout le diff ait été relu et que chaque case de la Definition of Done soit vérifiée. L'agent prépare et signale ; le membre décide.

## Préparer

1. **Identifier le ticket** d'après le nom de la branche (`<pseudo>/elt-<numéro>-…`), puis relire ses critères d'acceptation dans Linear. Si la branche ne contient pas d'identifiant ELT, le signaler.
2. **Mesurer le périmètre** :
   - `git fetch origin` (récupérer `main` à jour depuis GitHub : la copie locale de `main` est souvent en retard) ;
   - `git status` (fichiers non commités ou non suivis) ;
   - `git diff origin/main...HEAD --stat` (tout ce que la branche change par rapport à `main` à jour) ;
   - pour la PR d'un autre membre : `gh pr checkout <numéro>` dans un worktree dédié, puis les mêmes commandes.
   Si la branche contient des commits d'un autre ticket déjà fusionné en squash, le signaler : il faut la reconstruire depuis `origin/main` avant d'ouvrir la PR.
3. **Intégrer `main`** si la branche est en retard : `git merge origin/main`. Résoudre les conflits avec l'auteur des lignes concernées si elles ne sont pas les siennes.

## Vérifier

4. **Relire le diff complet, fichier par fichier** (`git diff origin/main...HEAD`), avec la grille ci-dessous.
5. **Lancer les tests** s'ils existent (`npm test`, ou la commande indiquée dans `package.json`). S'il n'y en a pas encore, le dire, sans prétendre qu'ils passent.

### Grille de relecture

- **Périmètre** : chaque fichier modifié est nécessaire au ticket. Signaler tout reformatage, renommage ou « nettoyage » hors sujet.
- **Fichiers partagés** (liste dans `CONTRIBUTING.md`) : s'il y en a, leur responsable (`docs/equipe.md`) a été prévenu.
- **Fonctionnel** : chaque critère d'acceptation est couvert ; dire pour chacun ce qui le prouve (test, écran, commande). Cas limites : entrée vide, erreur réseau, flux radio en panne, titre indisponible.
- **Sécurité** :
  - toute entrée est validée côté Express ;
  - les droits d'accès sont vérifiés dans le service, jamais seulement dans l'interface ;
  - les requêtes SQL sont paramétrées ;
  - les mots de passe sont hachés ;
  - aucun secret ni donnée personnelle réelle dans le diff : chercher les formats de clés courants et les adresses contenant un jeton ;
  - `.env.example` est à jour si une variable d'environnement a été ajoutée.
- **Tests** : ils existent, ils traduisent les critères d'acceptation, ils passent.
- **Architecture** : code rangé dans son domaine, couches respectées (routes → contrôleurs → services → accès aux données), contrat d'API respecté.
- **Conventions** (`CONTRIBUTING.md`) : nommage, commentaires en français en tête de fichier et de fonction, pas de commentaire à chaque ligne, pas de code mort ni de `console.log` de débogage oublié, aucun doublon d'une fonction déjà présente dans `shared/`.
- **Principes produit** (`AGENTS.md`) : en particulier, jamais de faux titre.
- **Interface** (si le ticket en touche une) : libellés des champs, navigation au clavier, contraste, textes alternatifs.

## Rapport

Un tableau, du plus grave au moins grave :

| Niveau | Fichier et ligne | Constat | Correction proposée |
| --- | --- | --- | --- |
| Bloquant | … | … | … |
| À corriger | … | … | … |
| Suggestion | … | … | … |

- **Bloquant** : faille de sécurité, critère non couvert, test en échec, secret dans le diff. Empêche la fusion.
- **À corriger** : convention non respectée, cas limite oublié.
- **Suggestion** : amélioration facultative.

Expliquer chaque point en une ou deux phrases simples. Puis rendre un verdict : **prêt**, **prêt après corrections listées**, ou **à reprendre**. Ne rien corriger sans l'accord de l'auteur ; après correction, relancer les tests.

## Definition of Done, case par case

Pour chaque case du modèle `.github/pull_request_template.md`, indiquer : **fait** (avec la preuve), **sans objet** (avec la mention autorisée) ou **à faire**. Les cas « sans objet » sont fixés dans `CONTRIBUTING.md` (section « Pull requests ») : s'y référer plutôt que de les déduire.

- La case « Je sais expliquer chaque bloc du diff sans regarder » appartient à l'auteur : proposer le skill `expliquer-code`, ne jamais la cocher à sa place.
- La case « Relue et approuvée par un autre membre » se coche seulement après une approbation réelle sur GitHub.

## Si on relit sa propre PR

- Message de commit et titre de la PR : `<type>: <ce que fait le commit> (ELT-<numéro>)`.
- Description : le modèle de PR rempli ; « Comment vérifier » donne des étapes concrètes.
- Si le ticket demande plusieurs PR, écrire `Part of ELT-<numéro>` dans chaque PR sauf la dernière (voir `CONTRIBUTING.md`).
- Pousser et ouvrir la PR seulement après accord explicite du membre : `git push -u origin <branche>`, puis `gh pr create`.

## Si on relit la PR d'un autre membre

- Une remarque par point, factuelle, en distinguant ce qui bloque la fusion de ce qui est une suggestion.
- Publier la relecture seulement après accord du relecteur : `gh pr review <numéro> --approve`, `--request-changes` ou `--comment`, avec le rapport.

## Règles

- Jamais de push sur `main`, jamais de push forcé.
- Ne jamais fusionner une PR sans l'approbation d'un autre membre.

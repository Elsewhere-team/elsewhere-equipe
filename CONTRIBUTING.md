# Contribuer à Elsewhere (équipe)

Ce fichier fixe les conventions du dépôt. Elles s'appliquent à tout le code, qu'il soit écrit à la main ou avec un agent.
Les règles destinées aux agents sont dans `AGENTS.md`, l'organisation de l'équipe dans `docs/equipe.md`.

## Nommage dans le code

| Élément | Convention | Exemple |
| --- | --- | --- |
| Variables et fonctions JavaScript | camelCase | `currentTrack`, `getStationById()` |
| Composants React | PascalCase, un composant par fichier | `StationCard.jsx` |
| Constantes globales | MAJUSCULES_AVEC_TIRETS_BAS | `MAX_STATIONS_PER_PAGE` |
| Fichiers JavaScript hors composants | kebab-case | `station-service.js` |
| Fichiers de test | nom du fichier testé + `.test.js`, à côté de lui | `station-service.test.js` |
| Dossiers | kebab-case | `web/src/features/lecteur/` |
| Migrations SQL | date, heure, puis action | `20261115-1430-create-users.sql` |
| Tables SQL | snake_case, au pluriel | `users`, `list_stations` |
| Colonnes SQL | snake_case, au singulier | `created_at`, `station_id` |
| Clés étrangères | `<table au singulier>_id` | `user_id` |
| Variables d'environnement | MAJUSCULES_AVEC_TIRETS_BAS | `DATABASE_URL` |
| Routes de l'API | kebab-case, ressources au pluriel | `GET /api/stations/:id` |

Les noms du code sont en anglais, les commentaires en français (voir `AGENTS.md`).
Pas d'espaces, d'accents ni de majuscules aléatoires dans les noms de fichiers : Linux distingue `Radio.js` de `radio.js`, macOS et Windows non.

Les migrations sont nommées par date et heure plutôt que par numéro (`001`, `002`…) : deux personnes qui en créent une le même jour n'obtiennent pas le même nom.

## Organisation des dossiers

On range par domaine (`comptes`, `moments`, `stations`, `guide`…), et les couches restent séparées à l'intérieur de chaque domaine. L'arborescence est décrite dans `AGENTS.md`.

Pourquoi : si on rangeait d'abord par couche (`routes/`, `controllers/`…), chaque ticket toucherait les mêmes dossiers que les tickets des autres, et les conflits se multiplieraient. Par domaine, chaque responsable travaille surtout chez lui.

## Fichiers partagés : on prévient avant de toucher

Ces fichiers impactent toute l'équipe. Toute modification passe par une pull request dédiée, annoncée sur le canal d'équipe et relue par leur responsable (voir `docs/equipe.md`) :

- `package.json` et le fichier de dépendances verrouillées (en cas de conflit, on le régénère avec `npm install`, on ne le corrige jamais à la main)
- configuration du lint, du formateur, du build
- `docs/contrat-api.md` et les types partagés entre l'API et l'interface
- `api/migrations/` : un seul responsable, celui de la base
- `.github/`
- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `docs/equipe.md`, `.claude/skills/`

## Ce qui n'entre jamais dans le dépôt

- `.env` et tout secret. On versionne `.env.example` avec des valeurs factices.
- `node_modules/`, dossiers de build, caches, réglages personnels d'éditeur.
- Fichiers lourds (audio, vidéo, grosses images).

Une clé commitée par erreur reste dans l'historique Git même après suppression : il faut la révoquer, en générer une nouvelle et prévenir l'équipe.

## Tickets

Les tickets vivent dans le projet Linear de l'équipe, avec les identifiants `ELT-<numéro>` :
https://linear.app/teamels/project/elsewhere-mvp-soutenance-14-dec-equipe-8cc9325e6822

- Chaque ticket porte une étiquette de zone (groupe « Zone ») : elle indique quel responsable le prend.

- Un ticket a un seul responsable. On ne prend un ticket qu'en s'en mettant responsable dans Linear.
- Un sprint correspond à un jalon du projet Linear (par exemple « S1 Socle »).
- Les statuts avancent tout seuls grâce à l'intégration GitHub de Linear : *In Progress* quand la branche est poussée, *In Review* quand la PR est ouverte, *Done* quand elle est fusionnée.
- Un ticket qui dépasse son échéance est signalé au point hebdomadaire, avec une décision : reporter, réduire ou abandonner.

## Branches

`main` doit toujours compiler et tourner.
Une branche par ticket, créée depuis `main` à jour, avec le nom proposé par Linear (bouton « Copy git branch name ») :

```
<pseudo-linear>/elt-<numéro>-<titre-du-ticket>
```

Linear reconnaît ce format et relie tout seul la branche et la pull request au ticket.
Une branche vit un ou deux jours au plus : au-delà, on découpe le ticket.

Chaque ticket a son propre **worktree** : un dossier séparé, relié au même dépôt Git, qui a sa branche à lui. On le crée avec Orca (nom affiché commençant par `ELT-<numéro>`) ou, sans Orca, avec :

```
git worktree add ../elsewhere-equipe-elt-<numéro> -b <nom-de-branche-linear> origin/main
```

- On ne change jamais de branche dans un dossier pour passer à un autre ticket : on ouvre le worktree du ticket.
- Une fois la PR fusionnée, on supprime le worktree, puis la branche locale. GitHub supprime la branche distante tout seul.
- Pour la branche locale, il faut `git branch -D` (D majuscule) : après un squash, Git ne retrouve pas les commits de la branche dans `main` et refuse la suppression prudente `git branch -d`.

## Commits

Format court inspiré de *Conventional Commits* : un type, un résumé en français, l'identifiant du ticket.

```
<type>: <ce que fait le commit> (ELT-<numéro>)
```

| Type | Usage |
| --- | --- |
| `feat` | nouvelle fonctionnalité |
| `fix` | correction de bug |
| `test` | ajout ou modification de tests |
| `docs` | documentation seule |
| `refactor` | réorganisation du code sans changement de comportement |
| `chore` | outillage, configuration, dépendances |

Exemple : `feat: affiche le titre en cours d'une station (ELT-21)`

## Pull requests

- Jamais de push direct sur `main` : tout passe par une pull request.
- Avant d'ouvrir la PR, on récupère `main` à jour, on l'intègre à sa branche et on vérifie que tout tourne encore.
- Une PR est relue et approuvée par **un autre membre de l'équipe** avant fusion. L'auteur ne fusionne pas sans cette approbation.
- Le titre de la PR reprend le format des commits.
- Les PR sont fusionnées en squash : tous leurs commits deviennent un seul commit sur `main`, dont le message est le titre de la PR, suivi de son numéro ajouté par GitHub (par exemple `(#3)`). On obtient ainsi une ligne par ticket dans l'historique. GitHub est configuré pour n'autoriser que ce mode (`scripts/configurer-github.sh`).
- La description suit le modèle `.github/pull_request_template.md`, qui contient la Definition of Done. Une PR n'est fusionnée que lorsque toutes ses cases sont cochées.
- Une case qui ne s'applique pas est cochée et suivie de la mention `(sans objet : documentation uniquement)`. Seules les cases liées au code (tests, commentaires) peuvent l'être, et seulement si le diff ne contient que de la documentation.
- Petites PR : si un agent a modifié des fichiers hors du ticket, on les retire avant d'ouvrir la PR.

## Relecture

- Une PR ouverte reçoit une relecture sous 24 h. Si personne n'est disponible, on le signale sur le canal d'équipe plutôt que de fusionner sans relecture.
- Le relecteur suit le skill `relecture-avant-pr` : il vérifie les critères d'acceptation, le périmètre, les secrets et la lisibilité, pas le style personnel.
- On relit pour comprendre : si le relecteur ne comprend pas un bloc, l'auteur l'explique ou le simplifie.

## Décisions et suivi

- Une décision technique durable s'écrit dans `docs/decisions/`, un fichier par décision. On ne supprime jamais une décision : on en écrit une nouvelle qui la remplace, et on marque l'ancienne « Remplacée ».
- Chaque dimanche, le responsable de la démo publie dans Linear une mise à jour du projet (*project update*) « Bilan semaine N » : livré, glissé, décisions.

# Elsewhere — projet d'équipe Jedha

Règles à suivre par tout agent de code (Cursor, Claude Code ou autre) qui travaille dans ce dépôt.
Les humains de l'équipe suivent les mêmes règles : elles sont détaillées dans `CONTRIBUTING.md`.

Application d'écoute des radios du monde, construite par une équipe de 4 apprenants Jedha.
Échéances : gel des fonctionnalités le 6 décembre 2026, soutenance Jedha le 14 décembre 2026.

## Au début de chaque session

1. Demander à l'humain sur quel ticket il travaille (`ELT-<numéro>`), puis lire ce ticket dans le projet Linear de l'équipe (https://linear.app/teamels/project/elsewhere-mvp-soutenance-14-dec-equipe-8cc9325e6822) : c'est la référence du travail à faire. Le jalon du ticket indique le sprint en cours (par exemple « S1 Socle »).
2. Vérifier qu'on est dans le worktree de ce ticket (voir `CONTRIBUTING.md`, section « Branches »). Sinon, proposer de le créer au lieu de changer de branche dans le dossier courant.
3. Récupérer `main` à jour avant de commencer.
4. Références : périmètre dans `docs/prd.md`, organisation et responsables dans `docs/equipe.md`, choix techniques dans `docs/decisions/`, contrat d'API dans `docs/contrat-api.md`. Si un de ces fichiers n'existe pas encore, le ticket Linear fait référence.

## Stack

Décision `docs/decisions/001-stack.md`. Ne plus changer sans nouvelle décision écrite.

- API : Node.js + Express, en couches : routes → contrôleurs → services → accès aux données.
- Interface : React + Vite.
- Base : PostgreSQL chez Supabase, utilisé comme base uniquement. Authentification, règles d'accès et validation sont codées dans Express.

## Organisation du code

Le code est rangé par domaine, et chaque domaine a un responsable (`docs/equipe.md`). Les couches restent séparées à l'intérieur de chaque domaine.

```
api/                         API Express
  src/
    modules/<domaine>/       <objet>-routes.js → <objet>-controller.js → <objet>-service.js → <objet>-repository.js
    middlewares/             validation, erreurs, authentification
    shared/                  code utilisé par plusieurs domaines
  migrations/                scripts SQL versionnés
web/                         interface React + Vite
  src/
    features/<domaine>/      écrans et composants d'un domaine
    shared/                  composants et fonctions réutilisables, client API
docs/
```

Domaines : `comptes`, `moments`, `stations`, `guide` côté API ; `comptes`, `moments`, `direct`, `lecteur`, `guide` côté interface.

## Avant de créer un fichier

1. Chercher si ce qu'on veut écrire existe déjà, en particulier dans `shared/`. Ne jamais créer de doublon (`helpers2.js`, `utils-new.js`…).
2. Le ranger dans le dossier de son domaine. Seul le code réellement utilisé par plusieurs domaines va dans `shared/`.
3. Respecter le nommage de `CONTRIBUTING.md`. Jamais de `final`, `v2`, `old`, `copy` dans un nom.
4. Un nouveau fichier arrive dans la même pull request que le code qui l'utilise. Un fichier devenu inutile est supprimé.

## Ne pas modifier sans accord explicite de l'humain

Ces fichiers concernent toute l'équipe. S'arrêter et demander avant d'y toucher :

- `package.json` et le fichier de dépendances verrouillées (ne jamais modifier le second à la main)
- la configuration du lint, du formateur ou du build
- `docs/contrat-api.md` et les types partagés entre l'API et l'interface
- `api/migrations/` et le schéma de la base
- `.github/`
- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `HARNAIS.md`, `docs/equipe.md`, `.claude/skills/`, `.cursor/`

Ne jamais ajouter de bibliothèque sans l'accord de l'humain, avec une explication de son utilité.

## Périmètre d'un changement

- Ne toucher qu'aux fichiers nécessaires au ticket en cours. Pas de reformatage, de renommage ni de « nettoyage » hors du ticket.
- Ne jamais reformater un fichier entier : seul le formateur configuré dans le projet a ce rôle.
- Si la demande sort du périmètre du ticket ou du PRD : s'arrêter et demander. Une décision prise est écrite dans `docs/decisions/`.

## Principes produit

- Écoute possible sans compte.
- Jamais de faux titre : si un flux ne donne pas le titre en cours, on ne l'invente pas.
- Aucune question à l'utilisateur sur son origine ou sa motivation.
- L'utilisateur peut exporter et supprimer ses données.
- Le guide du lieu (chatbot RAG) est exigé pour la soutenance Jedha.

## Règles permanentes

- Aucun secret dans le dépôt : variables d'environnement, `.env` ignoré par Git, `.env.example` à jour avec des valeurs factices.
- Aucun fichier lourd (audio, vidéo, grosses images) dans Git.
- Demander confirmation avant de supprimer des fichiers ou de réécrire l'historique Git.
- Les membres de l'équipe ne sont pas tous ingénieurs : expliquer chaque choix technique simplement, sans appauvrir le fond.

## Commentaires dans le code

- En français. Les noms dans le code restent en anglais.
- En tête de fichier : son rôle dans l'architecture. En tête de fonction : pourquoi elle existe et ce qu'elle fait.
- Notes ponctuelles seulement sur les lignes délicates : asynchrone, sécurité, SQL, contournement non évident.
- Jamais de commentaire à chaque ligne. Un commentaire devenu faux est corrigé ou supprimé.

## Procédures

Rangées dans `.claude/skills/`. Claude Code les charge tout seul ; Cursor les appelle avec les commandes `/<nom>` de `.cursor/commands/`, sans les recopier (voir `HARNAIS.md`). Un autre agent lit le fichier `SKILL.md` correspondant quand la situation se présente.

- `point-projet` : en début de session ou de semaine, pour savoir où en est le projet et quel ticket prendre dans sa zone.
- `nouvelle-fonctionnalite` : pour coder un ticket.
- `relecture-avant-pr` : avant d'ouvrir une pull request, et pour relire celle d'un autre membre.
- `expliquer-code` : dès qu'un code est validé, pour l'expliquer et vérifier qu'on sait l'expliquer sans regarder.
- `fin-de-session` : à la fin de chaque session de travail.

## Façon de travailler

Avec un membre de l'équipe, suivre `.cursor/rules/binome.mdc` (la règle vaut aussi pour Claude Code). Les préférences personnelles de chacun restent dans ses propres réglages, hors du dépôt. L'organisation du harnais IA est décrite dans `HARNAIS.md`.

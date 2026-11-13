# Elsewhere — projet d'équipe

Application d'écoute des radios du monde, construite par une équipe de 4 apprenants Jedha pour la soutenance du 14 décembre 2026.

## Par où commencer

1. Lire `docs/equipe.md` : qui fait quoi, comment on décide, le calendrier.
2. Lire `CONTRIBUTING.md` : nommage, tickets, branches et worktrees, commits, pull requests.
3. Si vous codez avec un agent, lire `HARNAIS.md`. Claude Code lit `AGENTS.md` automatiquement ; dans Cursor, taper `/` pour voir les cinq commandes du projet : `/point-projet`, `/nouvelle-fonctionnalite`, `/relecture-avant-pr`, `/expliquer-code`, `/fin-de-session`.
4. Avant de prendre un ticket : `/point-projet` (ou le skill du même nom) indique le prochain ticket conseillé dans votre zone.

## Outils

| Besoin | Outil |
| --- | --- |
| Tickets, jalons, bilans hebdomadaires | [Linear, projet de l'équipe](https://linear.app/teamels/project/elsewhere-mvp-soutenance-14-dec-equipe-8cc9325e6822) (identifiants `ELT-<numéro>`) |
| Code, pull requests, relectures | GitHub |
| Éditeur et agent de code | Cursor ou Claude Code |
| Un worktree par ticket | Orca, ou `git worktree` |
| Règles et procédures des agents IA | `AGENTS.md`, `.claude/skills/`, `.cursor/` (voir `HARNAIS.md`) |
| Décisions techniques | `docs/decisions/` dans ce dépôt |

## Stack

Node.js + Express pour l'API, React + Vite pour l'interface, PostgreSQL chez Supabase pour la base. Détail et raisons : `docs/decisions/001-stack.md`.

## Lancer le projet en local

À compléter par le ticket d'initialisation (jalon S1). Cible : un nouveau membre lance le projet en 5 minutes.

```bash
git clone <url-du-depot>
cd elsewhere-equipe
cp .env.example .env    # puis remplir les valeurs
# installer les dépendances :
# lancer l'API :
# lancer l'interface :
```
# Elsewhere — projet d'équipe

Application d'écoute des radios du monde, construite par une équipe de 4 apprenants Jedha pour la soutenance du 14 décembre 2026.

## Par où commencer

1. Lire `docs/equipe.md` : qui fait quoi, comment on décide, le calendrier.
2. Lire `CONTRIBUTING.md` : nommage, tickets, branches et worktrees, commits, pull requests.
3. Si vous codez avec un agent (Cursor, Claude Code…) : il lit `AGENTS.md` automatiquement. Les procédures pas à pas sont dans `.claude/skills/`.

## Outils

| Besoin | Outil |
| --- | --- |
| Tickets, jalons, bilans hebdomadaires | [Linear, projet de l'équipe](https://linear.app/teamels/project/elsewhere-mvp-soutenance-14-dec-equipe-8cc9325e6822) (identifiants `ELT-<numéro>`) |
| Code, pull requests, relectures | GitHub |
| Éditeur et agent de code | Cursor ou Claude Code |
| Un worktree par ticket | Orca, ou `git worktree` |
| Décisions techniques | `docs/decisions/` dans ce dépôt |

## Stack

Node.js + Express pour l'API, React + Vite pour l'interface, PostgreSQL chez Supabase pour la base. Détail et raisons : `docs/decisions/001-stack.md`.

## Lancer le projet en local

À compléter par le ticket d'initialisation (jalon S1). Cible : un nouveau membre lance le projet en 5 minutes.

```bash
git clone <url-du-depot>
cd elsewhere-equipe
cp .env.example .env    # puis remplir les valeurs
# installer les dépendances :
# lancer l'API :
# lancer l'interface :
```

# Harnais IA d'Elsewhere (équipe)

L'équipe code avec plusieurs assistants IA : **Claude Code** (dans le terminal, seul ou via Orca) et **Cursor** (l'éditeur). Le *harnais*, c'est l'ensemble des fichiers du dépôt qui leur donnent les règles du projet et les façons de travailler, pour que les quatre membres obtiennent le même comportement, quel que soit l'outil.

## Principe : une seule source

Les règles et les méthodes sont écrites **une seule fois**, dans `AGENTS.md`, `CONTRIBUTING.md` et `.claude/skills/`. Cursor ne les recopie pas : il les charge avec la syntaxe `@fichier`. Une règle modifiée à sa source s'applique aussitôt à tous les outils, sans deux versions qui divergent.

| Rôle | Fait foi | Claude Code le lit | Cursor le lit via |
| --- | --- | --- | --- |
| Règles permanentes, stack, organisation du code, commentaires | `AGENTS.md` | via `CLAUDE.md` (`@AGENTS.md`) | `.cursor/rules/elsewhere.mdc` |
| Conventions et Definition of Done | `CONTRIBUTING.md` et `.github/pull_request_template.md` | depuis `AGENTS.md` | `.cursor/rules/elsewhere.mdc` |
| Façon de travailler avec un membre de l'équipe | `.cursor/rules/binome.mdc` | depuis `AGENTS.md` | `.cursor/rules/binome.mdc` |
| Méthodes (coder un ticket, relire, expliquer…) | `.claude/skills/<nom>/SKILL.md` | skill `<nom>` | commande `/<nom>` dans `.cursor/commands/` |
| Préférences personnelles (ton, niveau d'explication…) | réglages de chacun, hors du dépôt | réglages personnels | réglages personnels (*User Rules*) |

Les préférences personnelles ne sont jamais versionnées : ce qui convient à un membre ne s'impose pas aux trois autres.

## Contenu

- `.cursor/rules/elsewhere.mdc` : toujours actif. Charge `AGENTS.md` et `CONTRIBUTING.md`, et rappelle les cinq règles les plus importantes.
- `.cursor/rules/binome.mdc` : toujours actif. Façon de travailler commune : français, termes techniques définis, explication avant et après chaque changement, le membre garde la main sur les décisions.
- `.cursor/commands/` : une commande par skill. Taper `/` dans le chat de Cursor pour les voir.

| Commande Cursor et skill | Quand l'utiliser |
| --- | --- |
| `/point-projet` | en début de session ou de semaine, pour savoir où en est le projet et quel ticket prendre dans sa zone |
| `/nouvelle-fonctionnalite` | pour coder un ticket |
| `/relecture-avant-pr` | avant d'ouvrir une pull request, ou pour relire celle d'un autre membre |
| `/expliquer-code` | dès qu'un code est validé, pour l'expliquer et vérifier qu'on sait l'expliquer sans regarder |
| `/fin-de-session` | à la fin de chaque session |

## Limites

- Plusieurs skills lisent **Linear**, **GitHub** (`gh`) ou **Orca**. Si l'outil n'y a pas accès, la commande le signale et donne l'action à faire à la main.
- Le harnais ne remplace pas la Definition of Done : la relecture du diff, l'approbation par un autre membre et la fusion restent des gestes humains.

## Ajouter ou modifier une règle

1. Modifier `AGENTS.md`, `CONTRIBUTING.md` ou le skill concerné, jamais une copie dans `.cursor/`.
2. Nouveau skill : créer `.claude/skills/<nom>/SKILL.md`, ajouter sa commande dans `.cursor/commands/<nom>.md` sur le modèle des autres, et une ligne dans le tableau ci-dessus.
3. Ces fichiers sont partagés (`CONTRIBUTING.md`) : ticket, pull request dédiée, annonce sur le canal d'équipe.

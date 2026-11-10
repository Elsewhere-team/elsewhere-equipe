# Accord d'équipe

> Statut : proposition, à valider par les 4 membres en réunion de lancement (ELT-8).

À valider ensemble lors de la réunion de lancement (45 minutes). Toute modification ensuite se fait par pull request.

## Membres et disponibilités réelles

Les matinées de semaine sont prises par les cours (9h30–12h30). On note ce qui reste vraiment.

| Membre | Pseudo GitHub | Pseudo Linear | Disponibilités | Zone |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

## Zones de responsabilité

Une zone = un responsable, qui prend les tickets de sa zone et tranche les questions qui la concernent. Les zones suivent les jalons du projet Linear, ce qui permet de travailler en parallèle.

| Zone | Domaines du code | Contenu | Responsable |
| --- | --- | --- | --- |
| A — Socle et qualité | `api/src/middlewares/`, `api/src/shared/`, configuration, `.github/` | initialisation, architecture, contrat d'API, validation et erreurs, CI, déploiement, tests de bout en bout, documentation OpenAPI, mise en ligne | |
| B — Comptes et moments | `api/src/modules/comptes`, `api/src/modules/moments`, `api/migrations/`, `web/src/features/comptes`, `web/src/features/moments` | base de données, inscription et connexion, consentement, moments, historique et passeport | |
| C — Direct et lecture | `api/src/modules/stations`, `web/src/features/direct`, `web/src/features/lecteur` | test des métadonnées, annuaire de stations, tableau du direct, thèmes, lecteur, bouton « Garder ce moment » | |
| D — Guide et soutenance | `api/src/modules/guide`, `web/src/features/guide` | maquettes, guide du lieu (RAG), bilans hebdomadaires, diaporama, répétitions | |

## Responsables des fichiers partagés

| Fichier ou dossier | Responsable |
| --- | --- |
| `package.json`, configuration, `.github/` | responsable zone A |
| `docs/contrat-api.md` et types partagés | responsable zone A |
| `api/migrations/` et schéma de la base | responsable zone B |
| `AGENTS.md`, `CONTRIBUTING.md`, `.claude/skills/`, `docs/equipe.md` | |

## Comment on décide

- Le responsable de la zone tranche, après avoir demandé l'avis des autres. On n'attend pas l'unanimité.
- Une décision technique durable est écrite dans `docs/decisions/`.
- Un désaccord qui bloque plus de 24 h est arbitré au point hebdomadaire.

## Communication

- Canal d'équipe :
- Délai de réponse attendu : 24 h.
- Point écrit chaque jour, sur le canal : fait, prévu, bloqué (skill `fin-de-session`).
- Point en direct chaque semaine, 30 minutes, pour réarbitrer le périmètre. Jour et heure :
- Bilan du dimanche : mise à jour du projet Linear « Bilan semaine N » (livré, glissé, décisions), par le responsable de la zone D.

## Si quelqu'un ne livre pas

On réduit le périmètre, on ne compense pas. Le ticket non livré est retiré de la version de soutenance et noté au point hebdomadaire.

## Calendrier ([jalons Linear](https://linear.app/teamels/project/elsewhere-mvp-soutenance-14-dec-equipe-8cc9325e6822))

| Jalon | Échéance | Objectif |
| --- | --- | --- |
| S0 Cadrage équipe | 13 nov | accord d'équipe, stack validée, dépôt configuré, PRD d'équipe, annuaire choisi, test des radios |
| S1 Socle | 16 nov | projet initialisé, architecture, base de données, contrat d'API, CI |
| S2 Comptes et moments | 29 nov | zone B, en parallèle de S3 |
| S3 Direct et lecture | 29 nov | zone C, en parallèle de S2 |
| S4 Agent et déploiement MVP | **6 déc : gel des fonctionnalités** | guide RAG, tests de bout en bout, mise en ligne |
| S5 Soutenance Jedha | 14 déc | diaporama, deux répétitions chronométrées, vidéo de secours, soutenance |

Après le 6 décembre : uniquement des corrections.

## Périmètre minimal pour la soutenance

Écrit dans `docs/prd.md`. Ce que la démo doit montrer, et rien de plus.

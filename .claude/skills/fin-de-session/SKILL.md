---
name: fin-de-session
description: Clôturer une session de travail sur Elsewhere (équipe) en cinq minutes : état des lieux Git et GitHub, Definition of Done du ticket en cours, mises à jour Linear, point quotidien pour le canal d'équipe, nettoyage des worktrees et reprise. À utiliser à la fin de chaque session de travail.
---

# Fin de session

Objectif : ne rien perdre, tenir l'équipe au courant et savoir exactement par quoi reprendre. Rester bref : cinq minutes.

## Étapes

1. **État des lieux** :
   - worktrees : `git worktree list`, puis `git -C <chemin> status --short` pour chacun ;
   - commits du jour, toutes branches : `git log --all --since=midnight --oneline --author="<nom>"` ;
   - branches poussées ou non : `git status -sb` dans le worktree du ticket (« ahead » = commits pas encore sur GitHub) ;
   - pull requests du membre et relectures qu'on attend de lui : `gh pr list --author @me` et `gh pr list --search "review-requested:@me"`.
2. **Ne rien perdre** : s'il reste des modifications non commitées, proposer un commit de travail en cours sur la branche du ticket (jamais sur `main`), puis `git push` pour que le travail ne reste pas sur un seul poste.
3. **Definition of Done du ticket en cours** : parcourir les cases de `.github/pull_request_template.md` une par une et dire pour chacune **fait**, **sans objet** (mention autorisée par `CONTRIBUTING.md`) ou **à faire**. Ce qui reste à faire devient la première action de la prochaine session.
4. **Linear** — proposer :
   - un commentaire sur le ticket en cours : fait, reste à faire, blocage ;
   - pour un ticket dont l'échéance est dépassée : le signaler et préparer la décision à prendre au point hebdomadaire (reporter, réduire, abandonner).
   Les statuts avancent tout seuls avec l'intégration GitHub (`CONTRIBUTING.md`) : ne pas les changer à la main, sauf un ticket à plusieurs PR refermé trop tôt, à rouvrir.
5. **Point quotidien** pour le canal d'équipe, au format :
   - **Fait** : … (avec les liens des PR)
   - **Prévu** : …
   - **Bloqué** : … (ou « rien »)
6. **Décisions** : si une décision a été prise pendant la session, vérifier qu'elle est écrite dans `docs/decisions/`.
7. **Nettoyage** : pour chaque PR fusionnée (`gh pr list --state merged --author @me`), proposer de supprimer son worktree (`git worktree remove <chemin>`, ou depuis Orca) puis sa branche locale (`git branch -D <branche>`, voir `CONTRIBUTING.md`).
8. **Reprise**, en trois lignes au plus : le prochain ticket (voir le skill `point-projet`), la première action concrète, le blocage éventuel.
9. **Écrire dans Linear et pousser seulement après l'accord du membre**, en une seule fois.

## Règles

- Aucun secret dans Linear ni sur le canal d'équipe.
- Ne jamais supprimer un worktree qui contient des modifications non commitées.
- Ne pas traiter un arrêt comme un échec : constater, décider, reprendre.

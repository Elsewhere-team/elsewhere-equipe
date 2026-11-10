---
name: fin-de-session
description: Clore une session de travail sur Elsewhere (équipe) : état du ticket, point écrit pour l'équipe, nettoyage. À utiliser à la fin de chaque session de travail.
---

# Fin de session

1. Résumer en trois lignes ce qui a été fait pendant la session, sur quel ticket `ELT-<numéro>`.
2. Vérifier l'état du dépôt : rien de non commité qui devrait l'être, aucun fichier temporaire ni secret prêt à partir.
3. Si le travail n'est pas fini : pousser la branche pour qu'il ne reste pas uniquement sur ce poste, et noter dans un commentaire du ticket Linear où on s'est arrêté et la prochaine étape.
4. Rédiger le point quotidien pour le canal d'équipe, au format :
   - **Fait** : …
   - **Prévu** : …
   - **Bloqué** : … (ou « rien »)
5. Si une décision a été prise pendant la session, vérifier qu'elle est écrite dans `docs/decisions/`.
6. Si une PR a été fusionnée : proposer de supprimer son worktree et sa branche locale (`git branch -D`, voir `CONTRIBUTING.md`).
7. Proposer les mises à jour de Linear (commentaire, échéance, ticket à découper) et ne les faire qu'après accord de l'humain.

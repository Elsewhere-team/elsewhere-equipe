#!/usr/bin/env bash
# Rôle : appliquer au dépôt GitHub de l'équipe les réglages décrits dans
# CONTRIBUTING.md (fusion en squash uniquement, suppression automatique des
# branches fusionnées, protection de main avec une relecture obligatoire).
#
# Usage : scripts/configurer-github.sh <organisation>/<depot>
# Prérequis : GitHub CLI (gh) connecté avec un compte administrateur du dépôt,
# et une branche main déjà poussée.

set -euo pipefail

REPO="${1:?Usage : scripts/configurer-github.sh <organisation>/<depot>}"

gh auth status >/dev/null

echo "1/3 Fusion en squash uniquement, titre du commit = titre de la PR, branches supprimées après fusion"
gh api -X PATCH "repos/$REPO" \
  -F allow_squash_merge=true \
  -F allow_merge_commit=false \
  -F allow_rebase_merge=false \
  -f squash_merge_commit_title=PR_TITLE \
  -f squash_merge_commit_message=BLANK \
  -F delete_branch_on_merge=true >/dev/null

echo "2/3 Protection de main : PR obligatoire, une approbation d'un autre membre, pas de push forcé"
# Sur un compte gratuit, GitHub refuse la protection de branche pour un dépôt
# privé : on le signale au lieu d'arrêter le script.
if gh api -X PUT "repos/$REPO/branches/main/protection" --input - >/dev/null <<'JSON'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON
then
  echo "    Protection de main active."
else
  echo "    ATTENTION : protection refusée. Cause probable : dépôt privé sur un compte gratuit."
  echo "    Passer le dépôt en public, ou appliquer la règle « jamais de push sur main » par convention."
fi

echo "3/3 Vérification"
gh api "repos/$REPO" --jq '{squash_seul: (.allow_squash_merge and (.allow_merge_commit | not) and (.allow_rebase_merge | not)), titre_du_squash: .squash_merge_commit_title, branches_supprimees_apres_fusion: .delete_branch_on_merge, visibilite: .visibility}'

echo "Quand la CI existera, ajouter son nom dans « required_status_checks » et relancer le script."

#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="travel-hacks"
GITHUB_USER="elenasamanchuk"
MAX_WAIT=600

echo "Waiting for GitHub CLI authentication..."
elapsed=0
while ! gh auth status >/dev/null 2>&1; do
  if (( elapsed >= MAX_WAIT )); then
    echo "Timed out waiting for gh auth. Run: gh auth login"
    exit 1
  fi
  sleep 5
  elapsed=$((elapsed + 5))
done

echo "Authenticated as:"
gh auth status

if gh repo view "${GITHUB_USER}/${REPO_NAME}" >/dev/null 2>&1; then
  echo "Repository already exists, pushing..."
  git remote remove github 2>/dev/null || true
  git remote add github "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
  git push -u github main
else
  echo "Creating repository ${GITHUB_USER}/${REPO_NAME}..."
  gh repo create "${REPO_NAME}" \
    --public \
    --description "Интерактивный чеклист лайфхаков для путешественников" \
    --homepage "https://${GITHUB_USER}.github.io/${REPO_NAME}/" \
    --source=. \
    --remote=github \
    --push
fi

echo "Enabling GitHub Pages (workflow)..."
gh api \
  -X POST \
  "/repos/${GITHUB_USER}/${REPO_NAME}/pages" \
  -f build_type=workflow \
  2>/dev/null || echo "Pages may already be configured."

echo ""
echo "Done! Site will be live at:"
echo "https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo ""
echo "Check deploy status:"
echo "https://github.com/${GITHUB_USER}/${REPO_NAME}/actions"

#!/usr/bin/env bash
# Complete GitHub deploy via device OAuth flow (no gh login required upfront)
set -euo pipefail

REPO_NAME="travel-hacks"
GITHUB_USER="elenasamanchuk"
CLIENT_ID="Iv1.b507a08c87ecfe98"
LOG="/tmp/github-deploy.log"

exec > >(tee -a "$LOG") 2>&1

echo "=== GitHub device flow deploy $(date) ==="

RESP=$(curl -s -X POST https://github.com/login/device/code \
  -H "Accept: application/json" \
  -d "client_id=${CLIENT_ID}&scope=repo,workflow,read:org")

DEVICE_CODE=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('device_code',''))")
USER_CODE=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('user_code',''))")
INTERVAL=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('interval',5))")
EXPIRES=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('expires_in',900))")

if [ -z "$DEVICE_CODE" ] || [ -z "$USER_CODE" ]; then
  echo "Failed to get device code: $RESP"
  exit 1
fi

echo "AUTHORIZE NOW: https://github.com/login/device"
echo "CODE: $USER_CODE"
echo "Waiting up to ${EXPIRES}s..."

TOKEN=""
MAX_POLLS=$((EXPIRES / INTERVAL))
for i in $(seq 1 "$MAX_POLLS"); do
  sleep "$INTERVAL"
  TOKEN_RESP=$(curl -s -X POST https://github.com/login/oauth/access_token \
    -H "Accept: application/json" \
    -d "client_id=${CLIENT_ID}&device_code=${DEVICE_CODE}&grant_type=urn:ietf:params:oauth:grant-type:device_code")

  if echo "$TOKEN_RESP" | grep -q access_token; then
    TOKEN=$(echo "$TOKEN_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
    echo "Token received at poll $i"
    break
  fi

  if echo "$TOKEN_RESP" | grep -q '"error":"access_denied"'; then
    echo "Access denied by user"
    exit 1
  fi

  echo "poll $i: pending..."
done

if [ -z "$TOKEN" ]; then
  echo "Timeout — code expired or not authorized"
  exit 1
fi

export GH_TOKEN="$TOKEN"
echo "$TOKEN" | gh auth login --with-token

cd /workspace

if gh repo view "${GITHUB_USER}/${REPO_NAME}" >/dev/null 2>&1; then
  git remote remove github 2>/dev/null || true
  git remote add github "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
  git push -u github main
else
  gh repo create "${REPO_NAME}" \
    --public \
    --description "Интерактивный чеклист лайфхаков для путешественников" \
    --homepage "https://${GITHUB_USER}.github.io/${REPO_NAME}/" \
    --source=. \
    --remote=github \
    --push
fi

gh api -X POST "/repos/${GITHUB_USER}/${REPO_NAME}/pages" \
  -f build_type=workflow 2>/dev/null || true

echo "SUCCESS: https://${GITHUB_USER}.github.io/${REPO_NAME}/"

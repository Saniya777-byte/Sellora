set -euo pipefail

EC2_HOST="${EC2_HOST:-}"
EC2_USER="${EC2_USER:-ubuntu}"
EC2_KEY="${EC2_KEY:-~/.ssh/sellora-ec2.pem}"
EC2_PORT="${EC2_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/sellora/dist}"
CLIENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../client" && pwd)"
DIST_DIR="${CLIENT_DIR}/dist"

log() { echo "[$(date '+%H:%M:%S')] $*"; }
err() { echo "[ERROR] $*" >&2; exit 1; }

[[ -z "$EC2_HOST" ]] && err "EC2_HOST is not set. Export it before running."
[[ -f "$EC2_KEY" ]]  || err "SSH key not found at: $EC2_KEY"
command -v rsync &>/dev/null || err "rsync not found. Install it first."

log "Building Sellora frontend..."
cd "${CLIENT_DIR}"
npm ci --silent
npm run lint       # fail fast on lint errors
npm test           # fail fast on test failures
npm run build

log "Build complete. Dist size: $(du -sh "${DIST_DIR}" | cut -f1)"

log "Creating remote backup..."
ssh -i "${EC2_KEY}" -p "${EC2_PORT}" \
  -o StrictHostKeyChecking=no \
  -o ConnectTimeout=15 \
  "${EC2_USER}@${EC2_HOST}" \
  "[ -d ${REMOTE_DIR} ] && cp -r ${REMOTE_DIR} ${REMOTE_DIR}.bak || true"

log "Uploading dist to ${EC2_HOST}:${REMOTE_DIR}..."
rsync -avz --delete \
  --exclude='.DS_Store' \
  -e "ssh -i ${EC2_KEY} -p ${EC2_PORT} -o StrictHostKeyChecking=no" \
  "${DIST_DIR}/" \
  "${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/"

log "Reloading Nginx on remote..."
ssh -i "${EC2_KEY}" -p "${EC2_PORT}" \
  -o StrictHostKeyChecking=no \
  "${EC2_USER}@${EC2_HOST}" \
  "sudo nginx -t && sudo systemctl reload nginx"

log "Deployment complete! Sellora is live at http://${EC2_HOST}"

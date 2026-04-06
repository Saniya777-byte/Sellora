#!/usr/bin/env bash
# =============================================================================
# scripts/setup-server.sh
# EC2 server bootstrap – installs Nginx, Node.js 20, and configures the app.
# Idempotent: safe to run multiple times.
# =============================================================================
set -euo pipefail

APP_DIR="/var/www/sellora"
NGINX_CONF="/etc/nginx/sites-available/sellora"
DOMAIN="${DOMAIN:-localhost}"
NODE_VERSION="20"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ── 1. System packages ────────────────────────────────────────────────────────
log "Updating system packages..."
sudo apt-get update -qq
sudo apt-get install -y --no-install-recommends \
  curl wget git unzip nginx ufw

# ── 2. Node.js via NodeSource ─────────────────────────────────────────────────
if ! command -v node &>/dev/null || [[ "$(node -v)" != v${NODE_VERSION}* ]]; then
  log "Installing Node.js ${NODE_VERSION}..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
else
  log "Node.js $(node -v) already installed."
fi

# ── 3. Application directory ──────────────────────────────────────────────────
log "Creating application directory: $APP_DIR"
sudo mkdir -p "${APP_DIR}/dist"
sudo chown -R "${USER}:${USER}" "${APP_DIR}"

# ── 4. Nginx configuration ────────────────────────────────────────────────────
log "Writing Nginx config for domain: $DOMAIN"
sudo tee "${NGINX_CONF}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${APP_DIR}/dist;
    index index.html;

    # SPA fallback – serve index.html for all routes
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1024;
}
EOF

# Enable site (idempotent via -f)
sudo ln -sf "${NGINX_CONF}" /etc/nginx/sites-enabled/sellora
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

# ── 5. Firewall ───────────────────────────────────────────────────────────────
log "Configuring UFW firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

log "Server setup complete."
log "Deploy the Vite dist/ folder to: ${APP_DIR}/dist"

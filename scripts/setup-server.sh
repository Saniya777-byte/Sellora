set -euo pipefail

APP_DIR="/var/www/sellora"
NGINX_CONF="/etc/nginx/sites-available/sellora"
DOMAIN="${DOMAIN:-localhost}"
NODE_VERSION="20"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "Updating system packages..."
sudo apt-get update -qq
sudo apt-get install -y --no-install-recommends \
  curl wget git unzip nginx ufw

if ! command -v node &>/dev/null || [[ "$(node -v)" != v${NODE_VERSION}* ]]; then
  log "Installing Node.js ${NODE_VERSION}..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
else
  log "Node.js $(node -v) already installed."
fi

log "Creating application directory: $APP_DIR"
sudo mkdir -p "${APP_DIR}/dist"
sudo chown -R "${USER}:${USER}" "${APP_DIR}"

log "Writing Nginx config for domain: $DOMAIN"
sudo tee "${NGINX_CONF}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${APP_DIR}/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1024;
}
EOF

sudo ln -sf "${NGINX_CONF}" /etc/nginx/sites-enabled/sellora
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

log "Configuring UFW firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

log "Server setup complete."
log "Deploy the Vite dist/ folder to: ${APP_DIR}/dist"

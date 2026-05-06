# MscTutor V4 — Complete Deployment Guide
# Hostinger VPS + PlanetScale + Firebase + All Services

---

## STEP 1: FREE ACCOUNTS SETUP (20 minutes)

### 1.1 PlanetScale Database (FREE)
1. Go to planetscale.com → Sign up free
2. Create database → Name: "msctutor" → Region: Asia Mumbai
3. Click "Connect" → Choose "Prisma" → Copy DATABASE_URL
4. Save: `DATABASE_URL="mysql://..."`

### 1.2 Firebase (FREE)
1. Go to console.firebase.google.com → Create project → Name: "msctutor"
2. Authentication → Sign-in methods → Enable: Google, Email/Password, Phone
3. Project Settings → General → Your apps → Add Web app → Copy all config values
4. Project Settings → Service accounts → Generate new private key → Download JSON
5. Convert JSON to base64: `cat service-account.json | base64 -w 0`
6. Save as FIREBASE_ADMIN_SDK_JSON

### 1.3 DeepSeek AI (cheapest AI)
1. Go to platform.deepseek.com → Sign up
2. API Keys → Create new key → Copy key
3. Save: `DEEPSEEK_API_KEY="sk-..."`
4. Start with $5 — enough for 50,000+ questions!

### 1.4 Upstash Redis (FREE)
1. Go to upstash.com → Sign up → Create database → Region: Asia
2. Copy REST URL and REST Token
3. Save both values

### 1.5 Resend Email (FREE 3000/month)
1. Go to resend.com → Sign up
2. API Keys → Create API key → Copy
3. Add your domain (optional — can use resend.dev domain for testing)

### 1.6 Razorpay (India payments — free to set up)
1. Go to razorpay.com → Sign up
2. Settings → API Keys → Generate Test Keys (use test mode first)
3. Copy Key ID and Key Secret

---

## STEP 2: HOSTINGER VPS SETUP (15 minutes)

### 2.1 SSH Access
```bash
ssh root@YOUR_VPS_IP
```

### 2.2 Install Node.js 20 + PM2 + Nginx
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx
npm install -g pm2
node --version  # Should show v20.x
```

### 2.3 Clone your project
```bash
cd /home
git clone YOUR_GITHUB_REPO msctutor
cd msctutor
```

### 2.4 Setup environment
```bash
cp .env.example .env
nano .env
# Fill ALL values from Step 1
```

### 2.5 Install dependencies & Build
```bash
npm install
npx prisma generate
npx prisma db push    # Creates all tables in PlanetScale
npm run build
```

### 2.6 Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup          # Copy and run the command it shows
```

---

## STEP 3: NGINX + SSL (10 minutes)

### 3.1 Nginx config
```bash
sudo nano /etc/nginx/sites-available/msctutor
```

Paste this:
```nginx
server {
    listen 80;
    server_name msctutor.in www.msctutor.in;
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
    }
}
```

### 3.2 Enable site + SSL
```bash
sudo ln -s /etc/nginx/sites-available/msctutor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install Certbot for FREE SSL
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d msctutor.in -d www.msctutor.in
# SSL renews automatically!
```

---

## STEP 4: DNS SETUP (5 minutes)

In your domain registrar (GoDaddy/Namecheap etc):
1. Add A Record: `@` → `YOUR_VPS_IP`
2. Add A Record: `www` → `YOUR_VPS_IP`
3. Wait 5-30 minutes for DNS propagation

---

## STEP 5: FIREBASE HOSTING DOMAIN (optional)

1. Firebase Console → Hosting → Add custom domain → msctutor.in
2. Add the TXT records shown (for domain verification)

---

## STEP 6: GOOGLE SEARCH CONSOLE + ADSENSE

### After site is live:
1. Go to search.google.com/search-console → Add property → msctutor.in
2. Verify with HTML file or DNS TXT record
3. Submit sitemap: `https://msctutor.in/sitemap.xml`

### For AdSense (after 30+ pages indexed):
1. Go to adsense.google.com → Apply
2. Add site URL: msctutor.in
3. Copy AdSense code → Add to app/layout.tsx `<head>` section
4. Wait for approval (1-2 weeks typically)

---

## STEP 7: ADMIN ACCOUNT SETUP

1. Register on your site at msctutor.in/register
2. Note your Firebase UID (from Firebase Console → Authentication → Users)
3. Add to .env: `ADMIN_FIREBASE_UID="your-uid-here"`
4. In PlanetScale: `UPDATE User SET role = 'super_admin' WHERE firebaseUid = 'your-uid';`
5. Restart: `pm2 restart msctutor`

---

## STEP 8: SEED INITIAL DATA (optional but recommended)

```bash
# Add initial subjects to DB
npx prisma db seed
# (if seed file exists — run it to add sample subjects/chapters)
```

Or use the Admin panel at msctutor.in/admin to:
- Add subjects
- Add chapters (manually or AI-generated)
- Upload PDF → auto-generate pages

---

## PM2 COMMANDS (daily use)

```bash
pm2 status          # Check if running
pm2 restart msctutor # After code changes
pm2 logs msctutor   # View logs
pm2 monit           # Real-time monitoring
```

---

## UPDATE DEPLOYMENT (when you push new code)

```bash
cd /home/msctutor
git pull origin main
npm install
npm run build
pm2 restart msctutor
```

---

## ENVIRONMENT VARIABLES CHECKLIST

Make sure ALL these are filled in .env:

```
✅ DATABASE_URL
✅ NEXT_PUBLIC_FIREBASE_API_KEY
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID
✅ NEXT_PUBLIC_FIREBASE_VAPID_KEY
✅ FIREBASE_ADMIN_SDK_JSON
✅ DEEPSEEK_API_KEY
✅ UPSTASH_REDIS_REST_URL
✅ UPSTASH_REDIS_REST_TOKEN
✅ RESEND_API_KEY
✅ NEXT_PUBLIC_APP_URL (= https://msctutor.in)
✅ ADMIN_FIREBASE_UID
```

OPTIONAL (add when needed):
```
⬜ RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET (for payments)
⬜ STRIPE_SECRET_KEY (for international payments)
⬜ R2_ACCOUNT_ID + keys (for image storage)
⬜ STORJ_ACCESS_KEY + keys (for user uploads)
```

---

## MONTHLY COST SUMMARY

| Service | Cost |
|---------|------|
| Hostinger VPS | ₹199/month |
| PlanetScale DB | ₹0 (FREE) |
| Firebase Auth + FCM | ₹0 (FREE) |
| DeepSeek AI | ₹50-300 (usage) |
| Upstash Redis | ₹0 (FREE) |
| Resend Email | ₹0 (FREE 3000/mo) |
| SSL Certificate | ₹0 (Let's Encrypt) |
| **TOTAL** | **₹250-500/month** |

---

## TROUBLESHOOTING

### Site not loading?
```bash
pm2 status          # Check if process is running
sudo nginx -t       # Check nginx config
sudo systemctl status nginx
```

### Database errors?
```bash
npx prisma db push  # Sync schema
npx prisma studio   # Visual DB editor
```

### Build fails?
```bash
npm run build 2>&1 | head -50  # See error details
```

### Out of memory?
```bash
# Increase Node.js memory
pm2 start ecosystem.config.js --max-memory-restart 1G
```

---

*Built with ❤️ by MscTutor — Free education for every Indian student*

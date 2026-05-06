# MscTutor — Hostinger VPS Deployment Guide
# Ek baar padho, phir follow karo — site live ho jaayegi!

## ═══ STEP 0 — Pehle ye accounts banao (FREE) ═══

| Service | Website | Kya milega |
|---------|---------|-----------|
| PlanetScale | planetscale.com | Free MySQL DB |
| Firebase | firebase.google.com | Auth + Push |
| DeepSeek | platform.deepseek.com | AI API key |
| Cloudflare R2 | cloudflare.com | Free 25GB storage |
| Upstash | upstash.com | Free Redis |
| Razorpay | razorpay.com | India payments |
| Resend | resend.com | 3000 free emails |

---

## ═══ STEP 1 — Hostinger SSH Login ═══

```bash
# Hostinger hPanel → VPS → Manage → SSH/Terminal
ssh root@YOUR_VPS_IP
# Password: jo Hostinger ne diya hai
```

---

## ═══ STEP 2 — Node.js + PM2 + Nginx Install ═══

```bash
# Node.js 20 install karo
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Version check karo
node --version   # v20.x.x hona chahiye
npm --version    # 10.x.x hona chahiye

# PM2 install karo (process manager)
npm install -g pm2

# Nginx install karo (web server)
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Log folder banao
sudo mkdir -p /var/log/msctutor
```

---

## ═══ STEP 3 — Project Upload ═══

### Option A — GitHub se (Recommended)
```bash
# Git install
sudo apt install git -y

# Project folder mein jaao
cd /home

# Clone karo (apna GitHub URL daalo)
git clone https://github.com/YOUR_USERNAME/msctutor.git
cd msctutor
```

### Option B — ZIP upload karo
```bash
# Apne computer se Hostinger File Manager mein ZIP upload karo
# Tab yahan extract karo:
cd /home
unzip msctutor.zip
cd msctutor
```

---

## ═══ STEP 4 — Environment Variables Set Karo ═══

```bash
# .env file banao
cp .env.example .env
nano .env
```

### .env mein ye values bharo:

```env
# ── DATABASE (PlanetScale) ──────────────────────────
# planetscale.com → Create Database → Connect → Prisma
DATABASE_URL="mysql://USER:PASSWORD@HOST/msctutor?sslaccept=strict"

# ── FIREBASE (google.com/firebase) ─────────────────
# Firebase Console → Project Settings → Web App → Config
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaXXXXXXXXX"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="msctutor.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="msctutor"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="msctutor.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123:web:abc"
NEXT_PUBLIC_FIREBASE_VAPID_KEY="BxxxxxxX"

# Firebase Admin SDK:
# Firebase → Project Settings → Service Accounts → Generate New Key
# Download JSON → base64 encode → paste here
# Command: cat serviceAccount.json | base64 -w 0
FIREBASE_ADMIN_SDK_JSON="eyJxxxxx..."

# ── DEEPSEEK (platform.deepseek.com) ───────────────
# Account banao → API Keys → Create Key
DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxx"
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL="deepseek-chat"

# ── CLOUDFLARE R2 (cloudflare.com) ─────────────────
# R2 → Create Bucket "msctutor-admin" → API Tokens
R2_ACCOUNT_ID="xxxxxxxx"
R2_ACCESS_KEY_ID="xxxxxxxx"
R2_SECRET_ACCESS_KEY="xxxxxxxx"
R2_BUCKET_NAME="msctutor-admin"
R2_PUBLIC_URL="https://pub-xxxx.r2.dev"

# ── UPSTASH REDIS (upstash.com) ────────────────────
# Create Database → REST API tab
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXxxxxxxx"

# ── RAZORPAY (razorpay.com) ────────────────────────
# Dashboard → Settings → API Keys
RAZORPAY_KEY_ID="rzp_live_xxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxx"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_xxxxxxx"

# ── RESEND (resend.com) ────────────────────────────
# API Keys → Create
RESEND_API_KEY="re_xxxxxxx"
EMAIL_FROM="noreply@msctutor.in"

# ── APP CONFIG ─────────────────────────────────────
NEXT_PUBLIC_APP_URL="https://msctutor.in"
NEXT_PUBLIC_APP_NAME="MscTutor"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@msctutor"
NEXT_PUBLIC_TWITTER_URL="https://x.com/msctutor"
NEXT_PUBLIC_TELEGRAM_URL="https://t.me/msctutor"
NEXT_PUBLIC_PLAY_STORE_URL="https://play.google.com/store/apps/details?id=in.msctutor"
```

**Nano editor me save karne ka tarika:**
- Ctrl+X dabao
- Y dabao
- Enter dabao

---

## ═══ STEP 5 — Install + Build ═══

```bash
# Dependencies install karo (~3-5 minutes)
npm install

# Prisma generate karo
npx prisma generate

# Database tables banao
npx prisma db push

# Production build banao (~5-8 minutes)
npm run build
```

---

## ═══ STEP 6 — PM2 se Start Karo ═══

```bash
# PM2 se start karo
pm2 start ecosystem.config.js

# Status check karo
pm2 status
# "online" dikhna chahiye ✅

# Logs dekhne ke liye:
pm2 logs msctutor

# Auto-start on server restart:
pm2 save
pm2 startup
# Jo command aaye, copy-paste karo
```

---

## ═══ STEP 7 — Nginx Configure Karo ═══

```bash
# Config file banao
sudo nano /etc/nginx/sites-available/msctutor
```

**Ye content paste karo:**
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
    }
}
```

```bash
# Site enable karo
sudo ln -s /etc/nginx/sites-available/msctutor /etc/nginx/sites-enabled/

# Test karo
sudo nginx -t
# "syntax is ok" aana chahiye

# Restart karo
sudo systemctl restart nginx
```

---

## ═══ STEP 8 — SSL Certificate (HTTPS) ═══

```bash
# Certbot install karo
sudo apt install certbot python3-certbot-nginx -y

# SSL certificate lo (FREE)
sudo certbot --nginx -d msctutor.in -d www.msctutor.in
# Email daalo
# Y dabao terms accept karne ke liye

# Auto-renewal test karo
sudo certbot renew --dry-run
```

**Ab aapki site HTTPS pe live hai! 🎉**

---

## ═══ STEP 9 — Domain DNS Setup (Hostinger) ═══

```
Hostinger → Domains → msctutor.in → DNS Zone

Add A Records:
Type: A | Name: @   | Value: YOUR_VPS_IP
Type: A | Name: www | Value: YOUR_VPS_IP

5-10 minutes mein DNS propagate ho jaata hai
```

---

## ═══ STEP 10 — Firebase Setup ═══

```
1. firebase.google.com → New Project → "msctutor"

2. Authentication:
   Build → Authentication → Sign-in method → Enable:
   ✅ Google
   ✅ Email/Password
   ✅ Phone

3. Firestore:
   Build → Firestore Database → Create database
   Start in production mode

4. Cloud Messaging (FCM):
   Project Settings → Cloud Messaging → Enable

5. Service Account (for admin SDK):
   Project Settings → Service Accounts → Generate new private key
   Download JSON file
   
   Encode to base64:
   cat serviceAccount.json | base64 -w 0
   
   Copy output → paste in .env as FIREBASE_ADMIN_SDK_JSON

6. Authorized domains:
   Authentication → Settings → Authorized domains
   Add: msctutor.in
```

---

## ═══ STEP 11 — Final Checks ═══

```bash
# Site check karo
curl https://msctutor.in
# HTML aana chahiye

# PM2 status
pm2 status
# online ✅

# Nginx status  
sudo systemctl status nginx
# active (running) ✅

# SSL check
curl -I https://msctutor.in
# HTTP/2 200 aana chahiye ✅
```

---

## ═══ STEP 12 — AdSense Apply ═══

```
WAIT: Pehle 30+ pages Google mein index hone do.
      User questions se auto-pages ban jaayenge.
      
1. google.com/adsense → Sign up
2. Site: msctutor.in
3. Verification code lagao:
   app/layout.tsx ke <head> mein:
   <meta name="google-adsense-account" content="ca-pub-XXXXXXXX" />
4. Submit for review
5. Approval aane par: AdSense dashboard → Auto ads ON

IMPORTANT: Koi AdSense code site ke code mein mat daalo pehle.
Sirf verification meta tag lagao.
```

---

## ═══ Update Karne Ka Tarika ═══

```bash
cd /home/msctutor
git pull                    # Latest code fetch karo
npm install                 # New dependencies
npm run build               # Rebuild
pm2 restart msctutor       # Restart server
```

---

## ═══ Common Errors & Fix ═══

```
Error: Cannot connect to database
Fix: DATABASE_URL check karo .env mein

Error: Firebase auth failed
Fix: Firebase project settings check karo

Error: DeepSeek API error
Fix: DEEPSEEK_API_KEY check karo, account mein balance hai?

Error: PM2 crashes
Fix: pm2 logs msctutor   ← error dekhne ke liye

Error: 502 Bad Gateway
Fix: pm2 restart msctutor && sudo systemctl restart nginx

Error: Build failed
Fix: node --version >= 18 hona chahiye
```

---

## ═══ Monthly Costs ═══

```
Hostinger VPS:    ₹199/month  ← already purchased ✅
PlanetScale DB:   ₹0          (free tier)
Firebase:         ₹0          (free tier)
DeepSeek AI:      ₹50-300     (usage based)
Cloudflare R2:    ₹0          (free 25GB)
Upstash Redis:    ₹0          (free tier)
Razorpay:         ₹0          (% per transaction)
Resend Email:     ₹0          (3000/month free)
SSL Certificate:  ₹0          (Let's Encrypt)
─────────────────────────────
TOTAL:            ₹250-500/month
```

---

**🎉 Congratulations! MscTutor live hai!**
**Visit: https://msctutor.in**

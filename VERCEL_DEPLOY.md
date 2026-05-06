# Vercel pe Deploy karna — Step by Step

## ═══ STEP 1 — GitHub pe Upload karo ═══

1. github.com → New repository → "msctutor" banao
2. Apne computer mein project folder kholo
3. Terminal/CMD mein:

```bash
cd msctutor
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/msctutor.git
git push -u origin main
```

---

## ═══ STEP 2 — Vercel Account Banao ═══

1. vercel.com → Sign Up with GitHub
2. "Add New Project" → GitHub repo select karo → Import

---

## ═══ STEP 3 — Environment Variables Add Karo ═══

Vercel Dashboard → Project → Settings → Environment Variables

**Minimum variables for basic test (site chalane ke liye):**

```
NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
NEXT_PUBLIC_APP_NAME = MscTutor
NEXT_PUBLIC_YOUTUBE_URL = https://youtube.com/@msctutor
NEXT_PUBLIC_TWITTER_URL = https://x.com/msctutor
NEXT_PUBLIC_TELEGRAM_URL = https://t.me/msctutor
NEXT_PUBLIC_PLAY_STORE_URL = https://play.google.com
```

**AI ke liye (DeepSeek):**
```
DEEPSEEK_API_KEY = sk-xxxxxxxx  ← platform.deepseek.com se lo
```

**Database ke liye (PlanetScale FREE):**
```
DATABASE_URL = mysql://USER:PASS@HOST/msctutor?sslaccept=strict
```

**Firebase ke liye (auth/login):**
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 123456789
NEXT_PUBLIC_FIREBASE_APP_ID = 1:xxx:web:xxx
FIREBASE_ADMIN_SDK_JSON = eyJ...  (base64 encoded service account JSON)
```

---

## ═══ STEP 4 — Deploy ═══

1. Vercel automatically build start karega
2. Build ~3-5 minutes lagti hai
3. Done! URL milega: https://msctutor.vercel.app

---

## ═══ STEP 5 — Database Setup (Ek baar) ═══

Vercel project ke baad local mein run karo:
```bash
npm install
npx prisma generate
npx prisma db push    ← DATABASE_URL .env mein hona chahiye
```

---

## ═══ Testing Without API Keys ═══

Agar abhi sirf site test karni hai bina API keys ke:

- Sirf NEXT_PUBLIC_APP_URL add karo
- Site open hogi, sab pages work karenge
- AI Ask box = demo mode mein chalega
- Comments = demo mode mein chalega
- Baar baad API keys add karo → real AI chalega

---

## ═══ Custom Domain Add Karo ═══

Vercel → Project → Settings → Domains → msctutor.in add karo
Phir domain provider mein:
- CNAME: www → cname.vercel-dns.com
- A: @ → 76.76.21.21

---

## ═══ Build Error Aaye To ═══

Most common fix:
```bash
# Local mein test karo pehle
npm install
npm run build

# Error dekho aur fix karo
```

Vercel pe common issues:
- Missing env variable → add karo
- Prisma generate nahi hua → vercel.json mein buildCommand sahi hai ✅
- Node version → Vercel settings mein Node 20 select karo
```

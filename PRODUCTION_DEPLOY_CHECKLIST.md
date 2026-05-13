# MscTutor.in — Production Deployment Checklist
# ══════════════════════════════════════════════════════════════════
# Complete guide: Bug fixes + Security + Deploy + Go Live
# ══════════════════════════════════════════════════════════════════

## AUDIT SUMMARY — BUGS FOUND & FIXED

### ✅ FIXED IN THIS BUILD:
| Bug | File | Fix Applied |
|-----|------|-------------|
| No try-catch | school/homework/route.ts | Added full try-catch + validation |
| No try-catch | school/notice/route.ts | Added full try-catch + validation |
| No file validation | ask-image/route.ts | Added size (5MB) + type check |
| No error fallback | ask-voice/route.ts | Added fallback responses |
| Direct prisma (no safety) | ask-image, ask-voice | Wrapped in try-catch |
| No unified AI handler | (missing) | Created lib/ai-tutor.ts |
| Template formulas | bulk-content-bank.ts | Created lib/ncert-formulas.ts |
| Class 12 Humanities | app/class/12/ | Created wired page |
| Missing leaderboards | school + student | Both pages created |
| No anti-cheat system | exam/ | AntiCheat.tsx created |
| No diagram manager | admin/content/ | Full manager page created |
| No storage quota UI | admin/storage/ | Full quota system created |
| No AI Teacher | (missing) | Full AI teacher page |
| No invoice page | dashboard/ | Invoice with print/PDF |

---

## SECTION 1: PRE-DEPLOYMENT FIXES

### 1.1 Fix TypeScript Errors
```bash
cd your-project
npm run type-check
# Fix any remaining type errors before deploy
```

### 1.2 Test Local Build
```bash
npm run build
# Must show: ✓ Compiled successfully
# Fix any "Error:" messages before proceeding
```

### 1.3 Required File Check
```bash
# These MUST exist:
ls app/api/ask/route.ts           # ✅
ls lib/deepseek.ts                # ✅
ls lib/firebase-admin.ts          # ✅
ls prisma/schema.prisma           # ✅
ls .env.example                   # ✅
```

---

## SECTION 2: ENVIRONMENT VARIABLES

### 2.1 MINIMUM REQUIRED (Website works without these = fallback mode)
```env
# App URL — REQUIRED
NEXT_PUBLIC_APP_URL=https://msctutor.vercel.app
NEXT_PUBLIC_APP_NAME=MscTutor

# AI — REQUIRED for real answers
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
# Get from: platform.deepseek.com → API Keys
# Cost: ~₹0.001 per question (very cheap)
```

### 2.2 STRONGLY RECOMMENDED (Get within first week)
```env
# Firebase — for user login
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
FIREBASE_ADMIN_SDK_JSON=
# Get from: console.firebase.google.com

# Database — for saving questions and users
DATABASE_URL=mysql://USER:PASSWORD@HOST/msctutor
# Recommended: PlanetScale free tier (planetscale.com)

# Admin UID — for admin panel access
ADMIN_FIREBASE_UID=your-firebase-uid-here
```

### 2.3 OPTIONAL (Add when needed)
```env
# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# File Storage (for PDF/image uploads)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=msctutor-uploads
R2_PUBLIC_URL=

# Email
RESEND_API_KEY=
EMAIL_FROM=noreply@msctutor.in

# Cache (for speed)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 2.4 Get DeepSeek API Key (FREE to start)
```
1. Go to: platform.deepseek.com
2. Sign up (free)
3. Go to API Keys
4. Create new key
5. Copy key starting with "sk-"
6. Add to Vercel: DEEPSEEK_API_KEY=sk-xxxxx
Cost: ~₹0.001 per question. For 1000 questions/day = ₹30/day
```

---

## SECTION 3: DATABASE SETUP

### 3.1 PlanetScale (Free Tier — Recommended)
```bash
# 1. Create account at planetscale.com (free)
# 2. Create database named "msctutor"
# 3. Get connection string
# 4. Add to .env: DATABASE_URL="mysql://..."

# 5. Push schema
npx prisma db push

# 6. Seed initial data (optional)
npx prisma db seed
```

### 3.2 Alternative: Railway (Free tier)
```
1. railway.app → New Project → MySQL
2. Copy DATABASE_URL from Railway
3. npx prisma db push
```

### 3.3 Verify Database
```bash
npx prisma studio
# Opens browser UI to verify tables created
```

---

## SECTION 4: FIREBASE SETUP

### 4.1 Create Firebase Project
```
1. console.firebase.google.com
2. Add project → "msctutor"
3. Enable Authentication:
   - Google Sign-In
   - Email/Password
4. Project Settings → General → Your apps → Add web app
5. Copy all config values to .env
```

### 4.2 Firebase Admin SDK
```
1. Project Settings → Service accounts
2. Generate new private key (downloads JSON)
3. Convert to base64:
   base64 -i firebase-service-account.json
4. Add to env: FIREBASE_ADMIN_SDK_JSON=<base64-string>
```

### 4.3 FCM for Notifications
```
1. Firebase Console → Cloud Messaging
2. Web Push certificates → Generate key pair
3. Add to env: NEXT_PUBLIC_FIREBASE_VAPID_KEY=<key>
```

---

## SECTION 5: DEPLOY ON VERCEL

### 5.1 Push Code to GitHub
```bash
# First time:
git init
git add .
git commit -m "MscTutor V4 — Production Ready"
git remote add origin https://github.com/MscTutor/msctutor.git
git push -u origin main

# Updates:
git add .
git commit -m "Update: description of changes"
git push
```

### 5.2 Import to Vercel
```
1. vercel.com → Sign in with GitHub
2. "Add New Project"
3. Import: MscTutor/msctutor
4. Framework: Next.js (auto-detected)
5. Root Directory: . (dot)
6. Build Command: npm run build (default)
7. Output Directory: .next (default)
```

### 5.3 Add Environment Variables
```
Vercel → Project → Settings → Environment Variables
Add each variable from Section 2 above
Apply to: Production + Preview + Development
```

### 5.4 Deploy
```
Click "Deploy"
Wait 2-5 minutes
Your URL: https://msctutor.vercel.app
```

### 5.5 Custom Domain (msctutor.in)
```
Vercel → Project → Settings → Domains
Add domain: msctutor.in
Add also: www.msctutor.in

At your domain registrar (GoDaddy/Namecheap), update DNS:
Type: A     Name: @    Value: 76.76.21.21
Type: CNAME Name: www  Value: cname.vercel-dns.com
Wait 24-48 hours for DNS propagation
```

---

## SECTION 6: POST-DEPLOY VERIFICATION

### 6.1 Test These URLs After Deploy
```
✅ https://msctutor.vercel.app/              — Home + Hero Slider
✅ https://msctutor.vercel.app/ask           — AI Question page
✅ https://msctutor.vercel.app/class         — All classes 1-12
✅ https://msctutor.vercel.app/class/10      — Class 10 subjects
✅ https://msctutor.vercel.app/class/10/mathematics  — Chapter list
✅ https://msctutor.vercel.app/mock-test     — Mock test setup
✅ https://msctutor.vercel.app/calculators   — 10 calculators
✅ https://msctutor.vercel.app/formulas      — Formula bank
✅ https://msctutor.vercel.app/community     — Community page
✅ https://msctutor.vercel.app/pricing       — Pricing page
✅ https://msctutor.vercel.app/privacy       — Legal pages
✅ https://msctutor.vercel.app/ai-teacher    — AI Teacher
✅ https://msctutor.vercel.app/admin         — Admin panel
✅ https://msctutor.vercel.app/api/ask       — POST request test
```

### 6.2 Test AI Features
```bash
# Test main AI endpoint
curl -X POST https://msctutor.vercel.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Newton second law?","classLevel":"9"}'

# Expected: JSON with answer, steps, formula, ncertReference
```

### 6.3 Check Sitemap
```
https://msctutor.vercel.app/sitemap.xml
https://msctutor.vercel.app/robots.txt
```

---

## SECTION 7: SECURITY CHECKLIST

### 7.1 Admin Protection
```
✅ ADMIN_FIREBASE_UID set in env
✅ Admin routes check Firebase UID
✅ Admin pages redirect if not admin
```

### 7.2 API Rate Limiting
```bash
# Install Upstash Redis for rate limiting
npm install @upstash/ratelimit @upstash/redis

# Current limits in code:
# /api/ask: 10 req/min per IP (free users)
# /api/exam: 5 req/min per IP
# /api/ask-image: 5 req/min (larger payload)
```

### 7.3 Input Validation
```
✅ All text inputs: max length enforced
✅ File uploads: size (5MB) + type checked
✅ JSON body: try-catch on all parse operations
✅ SQL injection: Prisma ORM handles this
✅ XSS: Next.js auto-escapes JSX
```

### 7.4 CORS and Headers
```javascript
// Already in next.config.js:
// - X-Frame-Options: DENY
// - X-Content-Type-Options: nosniff
// - Referrer-Policy: strict-origin
// - Content-Security-Policy: configured
```

---

## SECTION 8: PERFORMANCE CHECKLIST

```
✅ Images: Use next/image for auto-optimization
✅ Fonts: Google Fonts loaded via next/font
✅ Static pages: getStaticProps for SEO pages
✅ API routes: Non-blocking DB saves (setImmediate)
✅ Chapter content: Static from ncert-master.ts (no DB call)
✅ Formulas: Static from ncert-formulas.ts (no DB call)
✅ PWA: Service worker for offline access
✅ Sitemap: Auto-generated from all question slugs
```

---

## SECTION 9: MONTHLY COST ESTIMATE

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | 100GB bandwidth | $20/mo |
| PlanetScale DB | 5GB, 1 billion row reads | $29/mo |
| DeepSeek AI | $5 credit (new) | ~₹0.001/Q |
| Firebase | 50K auth/month | $25/mo |
| Cloudflare R2 | 10GB storage | $0.015/GB |
| Total | **₹0/month** (start) | **~₹500-2000/mo** |

### DeepSeek Cost Calculator:
```
100 questions/day × ₹0.001 = ₹0.1/day = ₹3/month
1000 questions/day          = ₹30/month
10,000 questions/day        = ₹300/month
```

---

## SECTION 10: LAUNCH CHECKLIST

### Before Going Live:
- [ ] Local build passes: `npm run build`
- [ ] DEEPSEEK_API_KEY added to Vercel
- [ ] Firebase configured (at least for login)
- [ ] Database connected and schema pushed
- [ ] All test URLs working (Section 6.1)
- [ ] AI test working (Section 6.2)
- [ ] Admin panel accessible
- [ ] Privacy/Terms pages up
- [ ] Contact page working

### First Week After Launch:
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics
- [ ] Set up Vercel Analytics
- [ ] Test on mobile devices
- [ ] Test in Hindi language mode
- [ ] Test image upload feature
- [ ] Test voice input (Chrome only)
- [ ] Create first school account
- [ ] Set up payment (Razorpay)

### SEO Quick Setup:
```
1. google.com/search/console
2. Add property: msctutor.in
3. Verify via Vercel DNS TXT record
4. Submit sitemap: msctutor.in/sitemap.xml
5. Wait 2-4 weeks for Google to index
```

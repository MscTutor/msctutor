# ══════════════════════════════════════════════════════════════════
# MscTutor — Vercel Environment Variables Setup Script
# Run in PowerShell from project root:
#   .\scripts\setup-vercel-env.ps1
# ══════════════════════════════════════════════════════════════════

Write-Host "`n🔧 MscTutor — Vercel Env Setup" -ForegroundColor Cyan
Write-Host "==============================`n" -ForegroundColor Cyan

# ── FIREBASE CONFIG ─────────────────────────────────────────────
Write-Host "📦 Firebase Config" -ForegroundColor Yellow
Write-Host "Ye values Firebase Console → Project Settings → General → Your Apps me milti hain`n"

$FB_API_KEY    = Read-Host "NEXT_PUBLIC_FIREBASE_API_KEY (AIza...)"
$FB_AUTH_DOMAIN = Read-Host "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (msctutor.firebaseapp.com)"
$FB_PROJECT_ID  = Read-Host "NEXT_PUBLIC_FIREBASE_PROJECT_ID (msctutor)"
$FB_BUCKET      = Read-Host "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (msctutor.appspot.com)"
$FB_SENDER_ID   = Read-Host "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
$FB_APP_ID      = Read-Host "NEXT_PUBLIC_FIREBASE_APP_ID (1:xxx:web:xxx)"
$FB_VAPID       = Read-Host "NEXT_PUBLIC_FIREBASE_VAPID_KEY (BNxxx... — Cloud Messaging me milega)"
$FB_ADMIN_UID   = Read-Host "ADMIN_FIREBASE_UID (aapka Firebase UID)"

Write-Host "`n💳 Razorpay Config" -ForegroundColor Yellow
Write-Host "razorpay.com → Settings → API Keys`n"

$RZP_KEY_ID     = Read-Host "RAZORPAY_KEY_ID (rzp_test_...)"
$RZP_SECRET     = Read-Host "RAZORPAY_KEY_SECRET"

Write-Host "`n🤖 DeepSeek AI" -ForegroundColor Yellow
$DS_KEY         = Read-Host "DEEPSEEK_API_KEY (sk-...)"

Write-Host "`n📤 Firebase Admin SDK JSON (base64)" -ForegroundColor Yellow
Write-Host "Pehle ye run karein: [Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\path\to\serviceAccountKey.json'))"
$FB_ADMIN_SDK   = Read-Host "FIREBASE_ADMIN_SDK_JSON (base64 string)"

# ── PUSH TO VERCEL ───────────────────────────────────────────────
Write-Host "`n🚀 Vercel me add kar raha hoon..." -ForegroundColor Green

function AddEnv($name, $value) {
    if ($value -and $value.Trim() -ne "") {
        Write-Host "  Adding $name..." -ForegroundColor Gray
        # Add to all 3 environments
        echo $value | npx vercel env add $name production 2>&1 | Out-Null
        echo $value | npx vercel env add $name preview 2>&1 | Out-Null
        echo $value | npx vercel env add $name development 2>&1 | Out-Null
        Write-Host "  ✅ $name" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  Skipped $name (empty)" -ForegroundColor Gray
    }
}

AddEnv "NEXT_PUBLIC_FIREBASE_API_KEY"            $FB_API_KEY
AddEnv "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"        $FB_AUTH_DOMAIN
AddEnv "NEXT_PUBLIC_FIREBASE_PROJECT_ID"         $FB_PROJECT_ID
AddEnv "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"     $FB_BUCKET
AddEnv "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" $FB_SENDER_ID
AddEnv "NEXT_PUBLIC_FIREBASE_APP_ID"             $FB_APP_ID
AddEnv "NEXT_PUBLIC_FIREBASE_VAPID_KEY"          $FB_VAPID
AddEnv "ADMIN_FIREBASE_UID"                      $FB_ADMIN_UID
AddEnv "FIREBASE_ADMIN_SDK_JSON"                 $FB_ADMIN_SDK
AddEnv "RAZORPAY_KEY_ID"                         $RZP_KEY_ID
AddEnv "RAZORPAY_KEY_SECRET"                     $RZP_SECRET
AddEnv "NEXT_PUBLIC_RAZORPAY_KEY_ID"             $RZP_KEY_ID   # same as KEY_ID
AddEnv "DEEPSEEK_API_KEY"                        $DS_KEY
AddEnv "DEEPSEEK_API_URL"                        "https://api.deepseek.com/v1"
AddEnv "DEEPSEEK_MODEL"                          "deepseek-chat"

Write-Host "`n✅ Sab env vars add ho gaye!" -ForegroundColor Green
Write-Host "🔄 Redeploy kar raha hoon..." -ForegroundColor Cyan

npx vercel --prod 2>&1

Write-Host "`n🎉 Done! https://msctutor.in pe check karein" -ForegroundColor Green

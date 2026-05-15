# ══════════════════════════════════════════════════════════════════
# MscTutor — Cloudflare R2 Setup Script
# Run: .\scripts\setup-r2.ps1
# ══════════════════════════════════════════════════════════════════

Write-Host "`n☁️  Cloudflare R2 Setup" -ForegroundColor Cyan
Write-Host "======================`n"

# Step 1: Login
Write-Host "Step 1: Cloudflare login..." -ForegroundColor Yellow
npx wrangler login

# Step 2: Get Account ID
Write-Host "`nStep 2: Account ID fetch kar raha hoon..." -ForegroundColor Yellow
$accountInfo = npx wrangler whoami 2>&1
Write-Host $accountInfo

$accountId = Read-Host "`nAapka Cloudflare Account ID paste karein (upar output me dikha hoga)"

# Step 3: Create R2 buckets
Write-Host "`nStep 3: R2 buckets create kar raha hoon..." -ForegroundColor Yellow

Write-Host "  Creating msctutor-uploads..." -ForegroundColor Gray
npx wrangler r2 bucket create msctutor-uploads 2>&1

Write-Host "  Creating msctutor-uploads-preview..." -ForegroundColor Gray
npx wrangler r2 bucket create msctutor-uploads-preview 2>&1

# Step 4: Create R2 API Token
Write-Host "`nStep 4: R2 API Token" -ForegroundColor Yellow
Write-Host "Browser me yahan jaayein: https://dash.cloudflare.com/profile/api-tokens"
Write-Host "  → 'Create Token'"
Write-Host "  → 'R2 Token' template use karein"
Write-Host "  → Permissions: R2:Edit for msctutor-uploads bucket"
Write-Host "  → Create Token → Copy karein`n"

$r2TokenId     = Read-Host "R2 Access Key ID (Token details me milega)"
$r2TokenSecret = Read-Host "R2 Secret Access Key"
$r2PublicUrl   = Read-Host "R2 Public URL (bucket settings me custom domain, e.g. https://uploads.msctutor.in)"

# Step 5: Push to Vercel
Write-Host "`nStep 5: Vercel me R2 env vars push kar raha hoon..." -ForegroundColor Green

function AddVercelEnv($name, $value) {
    foreach ($env in @("production", "preview", "development")) {
        echo $value | npx vercel env add $name $env 2>&1 | Out-Null
    }
    Write-Host "  ✅ $name" -ForegroundColor Green
}

AddVercelEnv "R2_ACCOUNT_ID"        $accountId
AddVercelEnv "R2_ACCESS_KEY_ID"     $r2TokenId
AddVercelEnv "R2_SECRET_ACCESS_KEY" $r2TokenSecret
AddVercelEnv "R2_BUCKET_NAME"       "msctutor-uploads"
AddVercelEnv "R2_PUBLIC_URL"        $r2PublicUrl

Write-Host "`n✅ R2 setup complete!" -ForegroundColor Green
Write-Host "🔄 Vercel redeploy trigger kar raha hoon..." -ForegroundColor Cyan
npx vercel --prod --yes 2>&1 | Select-String "https://"
Write-Host "`n🎉 https://msctutor.in live hai!" -ForegroundColor Green

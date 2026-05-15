# Run this FIRST to convert your Firebase service account JSON to base64
# Usage: .\scripts\encode-firebase-admin.ps1

$jsonPath = Read-Host "serviceAccountKey.json ka full path dein (e.g. C:\Users\apnao\Downloads\msctutor-firebase-adminsdk.json)"

if (Test-Path $jsonPath) {
    $base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($jsonPath))
    $base64 | Set-Content -Path ".\scripts\firebase-admin-b64.txt" -Encoding UTF8
    Write-Host "`n✅ Base64 string 'scripts\firebase-admin-b64.txt' me save ho gayi" -ForegroundColor Green
    Write-Host "Isko FIREBASE_ADMIN_SDK_JSON me paste karein" -ForegroundColor Yellow
    $base64 | clip
    Write-Host "📋 Clipboard me bhi copy ho gayi!" -ForegroundColor Cyan
} else {
    Write-Host "❌ File nahi mili: $jsonPath" -ForegroundColor Red
}

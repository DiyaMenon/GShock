# GShock Vercel Deployment Helper Script (PowerShell)
# This script helps configure your environment for Vercel deployment

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "GShock Vercel Deployment Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
Write-Host "📋 Checking environment files..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  backend\.env not found!" -ForegroundColor Yellow
    Write-Host "Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✅ Created backend\.env" -ForegroundColor Green
        Write-Host "   Please fill in your actual values before deploying" -ForegroundColor Gray
    }
} else {
    Write-Host "✅ backend\.env exists" -ForegroundColor Green
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "⚠️  frontend\.env not found!" -ForegroundColor Yellow
    Write-Host "Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path "frontend\.env.example") {
        Copy-Item "frontend\.env.example" "frontend\.env"
        Write-Host "✅ Created frontend\.env" -ForegroundColor Green
        Write-Host "   Please fill in your actual values before deploying" -ForegroundColor Gray
    }
} else {
    Write-Host "✅ frontend\.env exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Update backend\.env with your credentials:" -ForegroundColor Yellow
Write-Host "   - MongoDB URI" -ForegroundColor Gray
Write-Host "   - JWT Secret" -ForegroundColor Gray
Write-Host "   - ImageKit keys" -ForegroundColor Gray
Write-Host "   - Razorpay keys" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Update frontend\.env with your credentials:" -ForegroundColor Yellow
Write-Host "   - Firebase configuration" -ForegroundColor Gray
Write-Host "   - Backend API URL (update after backend deployment)" -ForegroundColor Gray
Write-Host "   - Razorpay Key ID" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Install Vercel CLI (if not already installed):" -ForegroundColor Yellow
Write-Host "   npm install -g vercel" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Deploy backend first:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""

Write-Host "5. Note the backend URL and update:" -ForegroundColor Yellow
Write-Host "   - frontend\.env: VITE_BACKEND_API_URL" -ForegroundColor Gray
Write-Host "   - frontend\vercel.json: API proxy destination" -ForegroundColor Gray
Write-Host "   - backend Vercel environment: FRONTEND_URL" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Deploy frontend:" -ForegroundColor Yellow
Write-Host "   cd ..\frontend" -ForegroundColor Gray
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""

Write-Host "7. Set environment variables in Vercel Dashboard for both projects" -ForegroundColor Yellow
Write-Host ""

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

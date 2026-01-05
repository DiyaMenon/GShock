#!/bin/bash

# GShock Vercel Deployment Helper Script
# This script helps configure your environment for Vercel deployment

echo "======================================"
echo "GShock Vercel Deployment Setup"
echo "======================================"
echo ""

# Check if .env files exist
echo "📋 Checking environment files..."
echo ""

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found!"
    echo "Creating from .env.example..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo "✅ Created backend/.env"
        echo "   Please fill in your actual values before deploying"
    fi
else
    echo "✅ backend/.env exists"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found!"
    echo "Creating from .env.example..."
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        echo "✅ Created frontend/.env"
        echo "   Please fill in your actual values before deploying"
    fi
else
    echo "✅ frontend/.env exists"
fi

echo ""
echo "======================================"
echo "📝 Next Steps:"
echo "======================================"
echo ""
echo "1. Update backend/.env with your credentials:"
echo "   - MongoDB URI"
echo "   - JWT Secret"
echo "   - ImageKit keys"
echo "   - Razorpay keys"
echo ""
echo "2. Update frontend/.env with your credentials:"
echo "   - Firebase configuration"
echo "   - Backend API URL (update after backend deployment)"
echo "   - Razorpay Key ID"
echo ""
echo "3. Install Vercel CLI (if not already installed):"
echo "   npm install -g vercel"
echo ""
echo "4. Deploy backend first:"
echo "   cd backend"
echo "   vercel --prod"
echo ""
echo "5. Note the backend URL and update:"
echo "   - frontend/.env: VITE_BACKEND_API_URL"
echo "   - frontend/vercel.json: API proxy destination"
echo "   - backend Vercel environment: FRONTEND_URL"
echo ""
echo "6. Deploy frontend:"
echo "   cd ../frontend"
echo "   vercel --prod"
echo ""
echo "7. Set environment variables in Vercel Dashboard for both projects"
echo ""
echo "======================================"
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "======================================"

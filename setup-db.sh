#!/bin/bash

# Harmony Tử Vi - Database Setup Script
# Tự động load .env.local, chạy migration, và seed database

set -e  # Exit on error

echo "🌱 Harmony Tử Vi - Database Setup"
echo "=================================="

# 1. Load .env.local
if [ ! -f .env.local ]; then
  echo "❌ .env.local not found. Please create it first."
  exit 1
fi

echo "📁 Loading .env.local..."
set -a && source .env.local && set +a

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set in .env.local"
  exit 1
fi

echo "✅ DATABASE_URL loaded: ${DATABASE_URL%???????}"  # Hide last 7 chars for security

# 2. Check if npm packages are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing npm packages..."
  npm install
fi

# 3. Run Prisma migrations
echo ""
echo "🔄 Running database migrations..."
npx prisma migrate dev --url="$DATABASE_URL" --skip-generate

# 4. Seed test data
echo ""
echo "🌱 Seeding test data..."
npm run seed

echo ""
echo "✅ Database setup completed!"
echo ""
echo "🚀 To start dev server:"
echo "   npm run dev"
echo ""
echo "📝 Test credentials:"
echo "   Email: demo@tuvi.local / Password: password123"
echo "   Email: test@tuvi.local / Password: password123"

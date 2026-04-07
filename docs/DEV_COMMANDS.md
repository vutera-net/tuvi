# Development Commands Reference

Quick reference for common development tasks.

## Project Setup

### ⚠️ Important: Prisma v7 Database Setup

**Issue:** Prisma v7 + PrismaPg adapter không tự động load `DATABASE_URL` từ `.env.local`

**Solution:** Cần source .env.local trước khi chạy migrate/seed

### Initial Setup (Lần Đầu)
```bash
# 1. Cài dependencies
npm install

# 2. Load environment variables và tạo database tables
set -a && source .env.local && set +a
npx prisma migrate dev --url="$DATABASE_URL"

# 3. Seed test data
npm run seed

# 4. Khởi động dev server
npm run dev
# Opens http://localhost:3000
```

### Quick Setup (Lần Sau)
```bash
set -a && source .env.local && set +a
npm run seed
npm run dev
```

### Or Use Automated Script
```bash
# Run từ project root
./setup-db.sh
```

This script automatically:
- Loads .env.local environment variables
- Installs npm packages (if needed)
- Runs Prisma migrations
- Seeds test data
- Shows test credentials

### Environment Variables
```bash
# .env.local should have:
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/harmony-tuvi"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
# Google OAuth (when ready):
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

## Development

### Start Development Server
```bash
npm run dev
# Opens http://localhost:3000
```

### Lint & Format
```bash
npm run lint          # Run ESLint
npx prettier --write . # Format code
```

## Database

### ⚠️ Important: Prisma v7 Migration Issue

**Cần chạy migration TRƯỚC seed**, vì Prisma v7 không tự động load .env.local

### Seed Database with Test Data
```bash
# Phải load .env.local trước seed
set -a && source .env.local && set +a
npm run seed

# Or use the automated script (recommended)
./setup-db.sh
```

### Create New Migration
```bash
# Load env first (Prisma v7 requirement)
set -a && source .env.local && set +a
npx prisma migrate dev --url="$DATABASE_URL" --name <migration_name>
```

### Reset Database (⚠️ Deletes all data)
```bash
# Load env first
set -a && source .env.local && set +a
npx prisma migrate reset --url="$DATABASE_URL"
```

### View Database in Prisma Studio
```bash
# Load env first
set -a && source .env.local && set +a
npx prisma studio --url="$DATABASE_URL"
```

## Building & Testing

### Production Build
```bash
npm run build
```

**Status:** ✅ Successful
- TypeScript: No errors
- Routes: 31 API + 12 main pages
- Build time: ~1.9s

### Start Production Server
```bash
npm start
```

### Check TypeScript
```bash
npx tsc --noEmit
```

## Build & Runtime Status

### ✅ Working
- Dev server: Starts in ~198ms
- Production build: Compiles successfully
- All 31 API routes working
- TypeScript: No errors
- Database: Connected and seeded

### ⚠️ Warnings (Non-Critical)
```
The "middleware" file convention is deprecated.
Please use "proxy" instead.
```
**Impact:** None - middleware still works perfectly
**Fix Timeline:** Will be addressed in future Next.js upgrade (non-urgent)

## Git Workflow

### Commit Changes
```bash
git add .
git commit -m "feat: description of changes"
git push origin develop
```

### Create Feature Branch
```bash
git checkout -b feature/feature-name
```

## Testing (Future)

### Run Unit Tests
```bash
npm test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm test -- --coverage
```

## Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Check Build
```bash
npm run build
# Check output in .next/
```

## Useful URLs

- **Local Dev:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/
- **Prisma Studio:** Run `npx prisma studio`

## Debugging

### Check Logs
```bash
# Development server logs
npm run dev  # Check terminal output

# Seed script logs
npm run seed
```

### Check Environment
```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Verify Next.js env
cat .env.local
```

## Useful Data

### Test User Credentials
```
Email: demo@tuvi.local
Password: password123
Subscription: Premium
```

### Test User 2
```
Email: test@tuvi.local
Password: password123
Subscription: Free
```

## File Locations

### Core Engines
- Lunar: `src/lib/engines/lunar-engine.ts`
- Ngu Hanh: `src/lib/engines/ngu-hanh-engine.ts`
- Tu Vi: `src/lib/engines/tuvi-engine.ts`
- Date Selection: `src/lib/engines/date-selection-engine.ts`
- Feng Shui: `src/lib/engines/bat-trach-engine.ts`, `cuu-cung-engine.ts`

### Data
- Nap Am: `src/data/nap-am.ts`
- Can Chi: `src/data/can-chi.ts`
- Tiet Khi: `src/data/tiet-khi.ts`
- Ngu Hanh: `src/data/ngu-hanh.ts`
- Truc: `src/data/truc.ts`
- Sao28: `src/data/sao28.ts`
- Events: `src/data/events.ts`
- Phu Tinh: `src/data/tuvi/phu-tinh.ts`

### Pages
- Homepage: `src/app/page.tsx`
- Calendar: `src/app/lich/page.tsx`
- Tu Vi: `src/app/tu-vi/page.tsx`
- Xem Menh: `src/app/xem-menh/page.tsx`
- Xem Ngay: `src/app/xem-ngay/page.tsx`
- Phong Thuy: `src/app/phong-thuy/page.tsx`
- Horoscope: `src/app/tu-vi-hang-ngay/page.tsx`

### API Routes
- Calendar: `src/app/api/calendar/`
- Tu Vi: `src/app/api/tuvi/`
- Date Selection: `src/app/api/ngaytot/`
- Feng Shui: `src/app/api/phongthuy/`
- User: `src/app/api/user/`
- Auth: `src/app/api/auth/`

## Common Issues

### Database Connection Error
```
Error: SASL: SCRAM-SERVER-FIRST-MESSAGE
```
→ Make sure `DATABASE_URL` environment variable is set correctly

### TypeScript Errors
```bash
npx tsc --noEmit
```
→ Run this to see all type errors

### Port 3000 Already in Use
```bash
lsof -i :3000  # Find process
kill -9 <PID>   # Kill it
npm run dev     # Restart
```

### Prisma Client Issues
```bash
npx prisma generate
npm install
```

## Performance Tips

1. **Cache:** Check Redis configuration in `.env.local`
2. **API:** Use GET with queries, POST with body
3. **Database:** Migrations are applied automatically
4. **Caching:** Calendar data cached 24h, Tu Vi charts 30d

---

**Need Help?** Check `docs/IMPLEMENTATION_PLAN.md` or `docs/PROJECT_STATUS.md`

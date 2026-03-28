# Development Commands Reference

Quick reference for common development tasks.

## Project Setup

### Initial Setup
```bash
npm install
npm run seed
npm run dev
```

### Environment Variables
```bash
# .env.local should have:
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/tuvingaymoi"
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

### Seed Database with Test Data
```bash
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/tuvingaymoi" npm run seed
```

### Create New Migration
```bash
npx prisma migrate dev --name <migration_name>
```

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma migrate reset
```

### View Database in Prisma Studio
```bash
npx prisma studio
```

## Building & Testing

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Check TypeScript
```bash
npx tsc --noEmit
```

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

**Need Help?** Check IMPLEMENTATION_PLAN.md or WEEK1_COMPLETION_SUMMARY.md

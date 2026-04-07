# 🚀 Harmony Tử Vi - Quick Start

## Lần Đầu Setup

```bash
# 1. Cài dependencies
npm install

# 2. Setup database (migrations + seed test data)
./setup-db.sh

# 3. Khởi động dev server
npm run dev
```

**✅ Server chạy tại:** http://localhost:3000

**📝 Test Credentials:**
- Email: `demo@tuvi.local` / Password: `password123` (Premium)
- Email: `test@tuvi.local` / Password: `password123` (Free)

**📊 Build Status:**
- ✅ Dev server: 198ms startup
- ✅ Production build: 1.9s, no errors
- ✅ TypeScript: 100% type-safe
- ✅ All 31 API routes
- ✅ 12 main pages
- ⚠️ 1 deprecation warning (non-blocking)

---

## Lần Sau (Chỉ chạy dev)

```bash
npm run dev
```

---

## ⚠️ Prisma v7 Important Note

**Khi chạy bất kỳ lệnh Prisma nào (migrate, seed, studio), phải load .env.local trước:**

```bash
set -a && source .env.local && set +a
npx prisma <command> --url="$DATABASE_URL"
```

**Or use the automated script:**
```bash
./setup-db.sh
```

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `./setup-db.sh` | Setup database (migrations + seed) |
| `npm run seed` | Re-seed test data |
| `npm test` | Run unit tests |
| `npm run build` | Production build |
| `npx prisma studio` | View database GUI |

---

## Documentation

- **Setup Issues?** → See `docs/DEV_COMMANDS.md`
- **Project Overview** → See `CLAUDE.md`
- **Implementation Progress** → See `docs/PROJECT_STATUS.md`
- **Testing Guide** → See `docs/TESTING.md`

---

## Warnings (Non-Critical)

### Middleware Deprecation Warning
```
⚠ The "middleware" file convention is deprecated. 
Please use "proxy" instead.
```

**Status:** Harmless - middleware still works fine. Will be fixed in future Next.js versions.

---

## Troubleshooting

**Problem:** `The table 'public.User' does not exist`
```bash
# Solution: Run migrations first
set -a && source .env.local && set +a
npx prisma migrate dev --url="$DATABASE_URL"
```

**Problem:** `DATABASE_URL not set`
```bash
# Solution: Make sure .env.local exists and has DATABASE_URL
cat .env.local | grep DATABASE_URL
```

**Problem:** Cannot connect to PostgreSQL
```bash
# Check if PostgreSQL is running
# Linux: sudo service postgresql status
# Mac: brew services list | grep postgresql
# Windows: Services > PostgreSQL
```

---

**Ready?** → `npm run dev`

# Hướng dẫn phát triển - Harmony Tử Vi

## Cài đặt lần đầu

```bash
# 1. Cài dependencies
npm install

# 2. Setup database (migrations + seed)
./setup-db.sh

# 3. Khởi động dev server
npm run dev
# → http://localhost:3000
```

**Login test:** `demo@tuvi.local` / `password123` (Premium)

---

## ⚠️ Lưu ý Prisma v7

Prisma v7 không tự động load `.env.local`. Cần source trước khi chạy lệnh Prisma:

```bash
set -a && source .env.local && set +a
npx prisma <command> --url="$DATABASE_URL"
```

Script `./setup-db.sh` đã xử lý việc này tự động.

---

## Lệnh thường dùng

| Lệnh | Mục đích |
|------|----------|
| `npm run dev` | Dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Chạy unit tests |
| `npm test:watch` | Test ở chế độ watch |
| `npm test:coverage` | Coverage report |
| `npm run seed` | Re-seed test data |
| `./setup-db.sh` | Full database setup (migrate + seed) |

---

## Database

### Tạo migration mới
```bash
set -a && source .env.local && set +a
npx prisma migrate dev --url="$DATABASE_URL" --name <tên_migration>
```

### Reset database (⚠️ xóa toàn bộ data)
```bash
set -a && source .env.local && set +a
npx prisma migrate reset --url="$DATABASE_URL"
```

### Xem database qua GUI
```bash
set -a && source .env.local && set +a
npx prisma studio --url="$DATABASE_URL"
```

---

## Environment Variables

File `.env.local` cần có:

```bash
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/harmony-tuvi"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (tùy chọn):
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."

# Stripe (tùy chọn cho dev):
# STRIPE_SECRET_KEY="sk_test_..."
# NEXT_PUBLIC_STRIPE_KEY="pk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## Cấu trúc dự án

```
src/
├── app/              # Next.js App Router (pages + API routes)
│   ├── api/          # 31 API endpoints
│   ├── lich/         # Lịch vạn niên
│   ├── tu-vi/        # Lá số tử vi
│   ├── xem-menh/     # Xem mệnh ngũ hành
│   ├── xem-ngay/     # Xem ngày tốt
│   ├── phong-thuy/   # Phong thủy
│   ├── tu-vi-hang-ngay/  # Tử vi hàng ngày
│   └── pricing/      # Bảng giá
├── components/       # React components
├── lib/
│   ├── engines/      # Core business logic (6 engines)
│   └── ...           # Auth, Prisma, cache, Stripe, SEO...
├── data/             # Static lookup tables
│   ├── tuvi/         # Tử vi data (14 sao, 12 cung, meanings)
│   └── phongthuy/    # Phong thủy data
└── types/            # TypeScript type definitions
```

### Core Engines

| File | Engine |
|------|--------|
| `src/lib/engines/lunar-engine.ts` | Âm lịch, Can Chi, Tiết Khí |
| `src/lib/engines/ngu-hanh-engine.ts` | Ngũ Hành, Nạp Âm |
| `src/lib/engines/tuvi-engine.ts` | Lá số Tử Vi |
| `src/lib/engines/tuvi-interpreter.ts` | Giải nghĩa Tử Vi |
| `src/lib/engines/date-selection-engine.ts` | Xem Ngày Tốt |
| `src/lib/engines/bat-trach-engine.ts` | Bát Trạch Phong Thủy |
| `src/lib/engines/cuu-cung-engine.ts` | Cửu Cung Phi Tinh |
| `src/lib/engines/horoscope-generator.ts` | Tử Vi Hàng Ngày |

---

## Troubleshooting

**`The table 'public.User' does not exist`**
```bash
set -a && source .env.local && set +a
npx prisma migrate dev --url="$DATABASE_URL"
```

**`DATABASE_URL not set`**
```bash
cat .env.local | grep DATABASE_URL
```

**Port 3000 đang bị dùng**
```bash
lsof -i :3000
kill -9 <PID>
```

**Prisma Client lỗi**
```bash
npx prisma generate
```

**TypeScript errors**
```bash
npx tsc --noEmit
```

---

## Cảnh báo đã biết (Non-critical)

```
The "middleware" file convention is deprecated. Please use "proxy" instead.
```
- File: `src/middleware.ts`
- Ảnh hưởng: Không có — middleware vẫn hoạt động bình thường
- Sẽ fix khi upgrade Next.js

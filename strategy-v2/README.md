# Harmony Tử Vi - Documentation

> Nền tảng phong thủy, tử vi và xem ngày toàn diện cho người Việt.

## Tài liệu

| File | Nội dung |
|------|----------|
| [STATUS.md](STATUS.md) | Trạng thái dự án hiện tại, tiến độ các phase |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Hướng dẫn cài đặt và phát triển local |
| [PLAN.md](PLAN.md) | Kế hoạch triển khai chi tiết (checklist) |
| [TESTING.md](TESTING.md) | Hướng dẫn chạy test và viết test mới |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Checklist deploy lên production (Vercel) |

## Tóm tắt nhanh

- **Tech stack:** Next.js 16.2 · React 19 · TypeScript · TailwindCSS 4 · Prisma 7 · PostgreSQL · Redis
- **Hoàn thành:** ~97% — sẵn sàng deploy
- **Build:** ✅ Passing (0 TypeScript errors, 31 API routes, 12 pages)
- **Test:** 85+ unit tests (lunar, ngu-hanh, tu-vi, pricing engines)

## Quick Start

```bash
npm install
./setup-db.sh    # migrate + seed
npm run dev      # http://localhost:3000
```

Login: `demo@tuvi.local` / `password123` (Premium)

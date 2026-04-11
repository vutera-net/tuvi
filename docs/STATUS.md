# Harmony Tử Vi — Project Status

**Cập nhật:** 11 tháng 4, 2026  
**Phiên bản:** 2.0 — Funnel Pivot  
**Trạng thái:** 🔄 Đang chuyển đổi sang free traffic engine + funnel sang AnMenh

> Xem chiến lược: [PRD.md](PRD.md) | Kế hoạch chi tiết: [PLAN.md](PLAN.md)

---

## Tổng quan pivot

| Trước (v1.0) | Sau (v2.0) |
|-------------|-----------|
| Subscription product (Free/Premium/VIP) | Free traffic engine |
| Monetize trực tiếp qua Stripe | Funnel sang AnMenh |
| Feature gating nội bộ | Content lock → drive AnMenh |
| CTA → /dang-ky TuVi | CTA → anmenh.vutera.net |

---

## Tiến độ v2.0

| Phase | Nội dung | % |
|-------|----------|---|
| A | CTA Pivot + Ecosystem Nav | ⏳ 0% |
| B | Funnel Components | ⏳ 0% |
| C | Content Restructure | ⏳ 0% |
| D | Analytics | ⏳ 0% |
| E | Cleanup (Stripe/Subscription) | ⏳ 0% |

---

## Nền tảng kỹ thuật (v1.0 — giữ lại)

### Engines (business logic) ✅

- **Lunar Engine** — Chuyển đổi âm-dương lịch (1900–2100), Can Chi, 24 tiết khí, Hoàng Đạo
- **Ngũ Hành Engine** — Nạp Âm, tương sinh/khắc, màu sắc/hướng may mắn
- **Tử Vi Engine** — 14 chính tinh, 12 cung, phụ tinh, Đại Hạn, Tiểu Hạn (via iztro)
- **Date Selection Engine** — 12 Trực, 28 Sao, Hoàng Đạo, ngày kỵ, 15 loại sự kiện
- **Bát Trạch Engine** — 8 Cung Mệnh, 8 hướng tốt/xấu
- **Cửu Cung Engine** — Phi Tinh năm/tháng, lưới Lạc Thư
- **Horoscope Generator** — Dự báo 5 lĩnh vực, điểm 1-10

### Pages ✅ (12 trang, giữ lại content, điều chỉnh funnel)

`/` · `/lich` · `/lich/[year]/[month]/[day]`  
`/xem-menh` · `/tu-vi` · `/tu-vi/[congiap]/nam-[year]`  
`/xem-ngay` · `/phong-thuy` · `/phong-thuy/menh-[nguhanh]`  
`/tu-vi-hang-ngay` · `/blog` · `/blog/[slug]`

### API ✅ (31 endpoints — giữ lại)

- Calendar: `/api/calendar`, `/api/calendar/month`, `/api/calendar/convert`
- Tu Vi: `/api/tuvi/chart`, `/api/tuvi/daily`, `/api/tuvi/tieu-han`
- Ngày Tốt: `/api/ngaytot/search`, `/api/ngaytot/check`
- Phong Thủy: `/api/phongthuy/battrach`, `/api/phongthuy/cuucung`
- Cron: `/api/cron/daily-horoscope`

### SEO ✅

- sitemap.xml, robots.txt, Open Graph, Twitter Cards
- JSON-LD schemas (FAQPage, Article, WebApplication, BreadcrumbList)
- 48 Tu Vi SEO pages (12 con giáp × 4 năm)
- 5 Phong Thủy SEO pages (theo mệnh)
- ISR daily calendar pages

### Tests ✅ (182+ tests)

`lunar-engine` · `ngu-hanh-engine` · `tuvi-engine` · `date-selection-engine`  
`bat-trach-engine` · `cuu-cung-engine` · `pricing` (cần update)

---

## Sẽ bị xóa (Phase E)

| Thành phần | Lý do |
|-----------|-------|
| Stripe integration | Không còn subscription |
| `/pricing` page | Không còn tiers |
| `/tai-khoan` (subscription) | Redirect AnMenh |
| `feature-gating.ts` | Thay bằng ContentLock component |
| `ConditionalAdSlot` | Không còn free/premium split |
| `/api/checkout`, `/api/subscription`, `/api/webhooks/stripe` | Không còn dùng |

---

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Frontend | Next.js 16.2.1, React 19.2.4, TypeScript 5 |
| Styling | TailwindCSS 4, shadcn/ui, Framer Motion |
| Backend | Next.js API Routes, Prisma 7.5.0 |
| Database | PostgreSQL (Neon) |
| Cache | Upstash Redis |
| Auth | NextAuth.js v5 (giữ lại cho lưu lá số) |
| Astrology | `iztro` (Tử Vi), `amlich` (âm lịch), `lunar-calendar-ts-vi` |
| Analytics | GA4 (funnel tracking) |
| Hosting | Vercel (target) |

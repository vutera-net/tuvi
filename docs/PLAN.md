# Kế hoạch triển khai - Harmony Tử Vi

**Cập nhật:** 8 tháng 4, 2026 | **Tổng tiến độ:** ~97%

## Tóm tắt phase

| Phase | Nội dung | Tiến độ |
|-------|----------|---------|
| 1 | Project Setup | ✅ 100% |
| 2 | Âm lịch & Ngũ Hành | ✅ 100% |
| 3 | Tử Vi Engine | ✅ 100% ✔ |
| 4 | Xem Ngày Tốt | ✅ 100% |
| 5 | Phong Thủy | ✅ 100% |
| 6 | UI/UX | ✅ 95% |
| 7 | API Routes | ✅ 100% |
| 8 | Tử Vi Hàng Ngày | ✅ 100% |
| 9 | Monetization | ✅ 100% |
| 10 | SEO | ✅ 100% |
| 11 | Testing | ⏳ 75% |
| 12 | Deployment | ⏳ 0% |

---

## Phase 1: Project Setup ✅

- [x] Next.js 16 + TypeScript + App Router
- [x] TailwindCSS 4 + shadcn/ui
- [x] ESLint + Prettier
- [x] Path aliases (`@/` → `src/`)
- [x] `.env.local` template
- [x] PostgreSQL + Prisma ORM (schema, migrations, seed)
- [x] NextAuth.js v5 (email/password + Google OAuth ready)
- [x] Upstash Redis client + caching helpers
- [x] Zustand stores
- [x] Sentry error tracking

---

## Phase 2: Âm lịch & Ngũ Hành ✅

- [x] `src/data/can-chi.ts` — Thiên Can, Địa Chi
- [x] `src/data/nap-am.ts` — Lục Thập Hoa Giáp (60 entries)
- [x] `src/data/ngu-hanh.ts` — Quan hệ Ngũ Hành
- [x] `src/data/tiet-khi.ts` — 24 tiết khí
- [x] `src/data/festivals.ts` — Ngày lễ âm/dương lịch VN
- [x] `src/data/ngay-ky.ts` — Tam Nương, Nguyệt Kỵ, Sát Chủ
- [x] Lunar Engine: chuyển đổi âm-dương, Can Chi ngày/tháng/năm/giờ, Hoàng Đạo
- [x] Ngũ Hành Engine: mệnh Nạp Âm, tương sinh/khắc, màu/hướng/số, hợp mệnh 2 người

---

## Phase 3: Tử Vi Đẩu Số Engine ✅

- [x] `src/data/tuvi/chinh-tinh.ts` — 14 chính tinh
- [x] `src/data/tuvi/phu-tinh.ts` — 12 phụ tinh
- [x] `src/data/tuvi/cung.ts` — 12 cung
- [x] `src/data/tuvi/cuc.ts` — 5 Cục (Thủy/Mộc/Kim/Thổ/Hỏa)
- [x] `src/data/tuvi/star-meanings.ts` — 504+ giải nghĩa sao × cung
- [x] Tính Cục từ Mệnh + Nạp Âm
- [x] An Mệnh cung, Thân cung, Tử Vi tinh, 14 chính tinh
- [x] Đánh giá độ sáng sao (Miếu/Vượng/Đắc Địa/Bình Hòa/Hãm Địa)
- [x] Tính Đại Hạn (10-year periods)
- [x] Giải nghĩa cung Mệnh, tổ hợp sao
- [x] Tích hợp thư viện `iztro` — `iztro-adapter.ts` xử lý toàn bộ: 14 chính tinh, Mệnh/Thân cung, Cục, Đại Hạn, phụ tinh (vi-VN); chỉ giữ Nạp Âm từ custom data
- [x] An phụ tinh đầy đủ (Lộc Tồn, Kình Dương, Đà La, Văn Xương, Văn Khúc, Tả Phù, Hữu Bật, Thiên Khôi, Thiên Việt, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp, Thiên Mã, Hồng Loan, Thiên Hỷ, v.v.)
- [x] Tính Tiểu Hạn (yearly) — `calculateTieuHan` + endpoint `POST /api/tuvi/tieu-han`

---

## Phase 4: Xem Ngày Tốt ✅

- [x] `src/data/truc.ts` — 12 Trực (Kiến, Trừ, Mãn...)
- [x] `src/data/sao28.ts` — 28 Sao phân loại tốt/xấu
- [x] `src/data/hoang-dao.ts` — Hoàng Đạo/Hắc Đạo theo ngày
- [x] `src/data/events.ts` — 15 loại sự kiện với yêu cầu Trực
- [x] Tính Trực, 28 Sao, Hoàng Đạo cho bất kỳ ngày nào
- [x] Check Tam Nương, Nguyệt Kỵ, Sát Chủ, Thời Địa
- [x] Tính điểm ngày theo loại sự kiện (cưới hỏi, khai trương, động thổ, nhập trạch, xuất hành)
- [x] Search ngày tốt theo khoảng thời gian + filter tuổi

---

## Phase 5: Phong Thủy Engine ✅

- [x] `src/data/phongthuy/bat-trach.ts` — 8 Cung Mệnh + hướng mappings
- [x] `src/data/phongthuy/cuu-cung.ts` — Lạc Thư + dữ liệu phi tinh
- [x] `src/data/phongthuy/noi-that.ts` — 6 loại phòng, 40+ quy tắc bố trí
- [x] Bát Trạch: Cung Mệnh (công thức Nam/Nữ), Đông/Tây Tứ Mệnh, 8 hướng
- [x] Cửu Cung: Phi Tinh năm/tháng, lưới Lạc Thư 3×3, phân tích & gợi ý
- [ ] Tính Phi Tinh theo ngày
- [ ] Gợi ý bố trí phòng cụ thể

---

## Phase 6: UI/UX ✅ (95%)

- [x] Layout: Header, Footer, navigation responsive
- [x] 12 trang chính với design mobile-first
- [x] Loading skeletons, error boundary, 404/500 pages
- [x] Dark/Light theme
- [x] **Trang Chủ:** Hero, công cụ nhanh, widget ngày hôm nay, 12 con giáp preview
- [x] **Lịch Vạn Niên:** Grid tháng, chi tiết ngày, đánh dấu ngày lễ
- [x] **Xem Mệnh:** Kết quả Ngũ Hành, màu sắc, hướng tốt
- [x] **Lá Số Tử Vi:** Form input, chart visualization, chi tiết cung, timeline Đại Hạn
- [x] **Xem Ngày Tốt:** Date range picker, filter sự kiện/tuổi, kết quả color-coded
- [x] **Phong Thủy:** Kết quả Bát Trạch, lưới Cửu Cung 3×3
- [x] **Tử Vi Hàng Ngày:** 12 tab con giáp, 5 lĩnh vực + điểm số

**Còn thiếu:**
- [ ] Tiểu Hạn visualization
- [ ] Chart comparison (2 người)

---

## Phase 7: API Routes ✅

31 endpoints hoạt động. Xem danh sách đầy đủ ở [STATUS.md](STATUS.md).

**Còn thiếu:**
- [ ] `POST /api/tuvi/compatibility` (hợp cách 2 lá số)
- [ ] `GET /api/ngaytot/month` (overview cả tháng)
- [ ] `GET /api/user/history` (lịch sử tra cứu)

---

## Phase 8: Tử Vi Hàng Ngày ✅

- [x] Horoscope Generator kết hợp Cửu Cung + 28 Sao + Trực + Can Chi
- [x] Điểm 1-10 cho 5 lĩnh vực, màu/hướng/giờ may mắn
- [x] Cron endpoint tạo horoscope cho 12 con giáp mỗi ngày
- [x] Lưu vào `DailyHoroscope` table

**Còn thiếu:**
- [ ] Push notifications (VIP — Web Push API)
- [ ] Invalidate ISR cache sau khi cron chạy

---

## Phase 9: Monetization ✅ (100%)

**Đã xong:**
- [x] Pricing: Free / Premium (99k/tháng, 799k/năm) / VIP (199k/tháng, 1,499k/năm)
- [x] Trang `/pricing` với feature comparison table
- [x] Stripe checkout + subscription endpoints
- [x] Stripe webhook handler route (signature verification, event routing)
- [x] Feature gating: 25+ gates theo tier, middleware bảo vệ API
- [x] Giới hạn Free: 3 lá số Tử Vi/tháng
- [x] Trang `/tai-khoan` — view gói hiện tại, upgrade (monthly/yearly toggle), cancel với confirmation modal

**Đã xong (vừa hoàn thành):**
- [x] **Fix webhook:** `handleSubscriptionChange` + `handleSubscriptionCancellation` + `handlePaymentFailed` trong `src/lib/stripe.ts` — cập nhật DB đúng
- [x] PDF export lá số Tử Vi (VIP) — `@react-pdf/renderer`, API `POST /api/tuvi/export-pdf`, nút trong header lá số
- [x] AdSense placeholder — `<AdSlot />` + `<ConditionalAdSlot />` (server, gate free-only), đã chèn vào `/`, `/blog`, `/tu-vi-hang-ngay`

---

## Phase 10: SEO ✅ (100%)

**Đã xong:**
- [x] `sitemap.xml` tự động generate
- [x] `robots.txt`
- [x] Open Graph + Twitter Card meta tags
- [x] JSON-LD schema generators (FAQPage, Article, WebApplication, BreadcrumbList)
- [x] `metadataBase` + hreflang (vi, vi-VN, x-default) trong root layout
- [x] Canonical URLs — `alternates.canonical` trong blog + dynamic pages
- [x] `/phong-thuy/menh-[nguhanh]` — 5 trang tĩnh (Kim/Mộc/Thủy/Hỏa/Thổ) + FAQ JSON-LD
- [x] `/lich/[year]/[month]/[day]` — ISR page với Can Chi, Hoàng Đạo, Trực, 28 Sao
- [x] `/tu-vi/[congiap]/nam-[year]` — 48 trang SSG (12 con giáp × 4 năm) + dự báo 5 lĩnh vực
- [x] Blog `/blog/[slug]` — Article JSON-LD + BreadcrumbList schema + canonical
- [x] `<Breadcrumb />` component (JSON-LD inline) dùng trong các dynamic pages
- [x] Sitemap cập nhật: +48 tu-vi pages, +5 menh pages, +30 lich pages

---

## Phase 11: Testing ⏳ (50%)

**Đã xong:**
- [x] Jest setup (jest.config.ts, jest.setup.ts)
- [x] `lunar-engine.test.ts` — 20+ tests
- [x] `ngu-hanh-engine.test.ts` — 15+ tests  
- [x] `tuvi-engine.test.ts` — 40+ tests
- [x] `pricing.test.ts` — 45+ tests
- [x] `date-selection-engine.test.ts` — Tam Nương, Nguyệt Kỵ, Sát Chủ (35+ tests)
- [x] `bat-trach-engine.test.ts` — 8 cung mệnh, hướng tốt/xấu (30+ tests)
- [x] `cuu-cung-engine.test.ts` — flying star grid, year/month center (32+ tests)
- **Tổng: 182+ tests**

**Còn thiếu:**
- [ ] Integration tests (API routes)
- [ ] E2E tests (Playwright)
- [ ] Load testing

---

## Phase 12: Deployment ⏳

Chưa thực thi. Xem [DEPLOYMENT.md](DEPLOYMENT.md) để thực hiện.

**Cần làm:**
- [ ] Tạo Vercel project, kết nối GitHub repo
- [ ] Provision Neon PostgreSQL (production)
- [ ] Setup Upstash Redis (production)
- [ ] Cấu hình environment variables trên Vercel
- [ ] Tạo Stripe products & prices (production keys)
- [ ] Custom domain + SSL
- [ ] Chạy Prisma migrations trên production DB
- [ ] Kiểm tra toàn bộ flow trên production

---

## Ưu tiên tiếp theo

1. **Phase 12** — Deploy ngay (infrastructure sẵn sàng)
2. **Phase 9** — Subscription management UI
3. **Phase 10** — Blog MDX + dynamic SEO pages
4. **Phase 11** — Mở rộng test coverage

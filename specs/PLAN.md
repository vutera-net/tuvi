# Kế hoạch triển khai — TuVi v2.0 (Funnel Pivot)

**Cập nhật:** 11 tháng 4, 2026  
**Tổng tiến độ:** ~55%  
**Mục tiêu:** Chuyển TuVi từ subscription product → free traffic engine + funnel sang AnMenh

> Xem chiến lược đầy đủ tại [PRD.md](PRD.md)

---

## Tóm tắt phase

| Phase | Nội dung | Ưu tiên | Tiến độ |
|-------|----------|---------|---------|
| A | Chuyển đổi CTA + Ecosystem Nav | 🔴 P0 | ✅ 100% |
| B | Funnel Mechanics (Content Lock + CTA Components) | 🔴 P0 | ✅ 95% |
| C | Content Restructure (Partial insight, template) | 🟠 P1 | ⏳ 0% |
| D | Analytics & Optimization | 🟠 P1 | ⏳ 0% |
| E | Cleanup (xóa subscription/stripe code) | 🟡 P2 | ⏳ 0% |

---

## Phase A — Chuyển đổi CTA + Ecosystem Nav ✅

### A1 — Update Header (SiteHeader.tsx) ✅
- [x] Thêm ecosystem banner (Harmony ↔ TuVi ↔ AnMenh) ở trên cùng
- [x] Nút "AnMenh →" gradient tím-đỏ, cạnh AuthButton
- [x] Nút point đến `https://anmenh.vutera.net/`
- [x] Mobile: hiện link AnMenh trong hamburger menu

### A2 — Update Footer (SiteFooter.tsx) ✅
- [x] Thêm section "Hệ sinh thái Harmony" — 3 nodes (Harmony / TuVi "đang ở đây" / AnMenh)
- [x] Xóa link `/pricing` khỏi footer
- [x] Thêm link AnMenh vào cột Hỗ trợ

### A3 — Auth Pages ✅ (quyết định giữ local)
> **Quyết định:** Giữ `/dang-ky` và `/dang-nhap` trên TuVi để user lưu lá số.  
> Không redirect sang AnMenh vì auth phục vụ mục đích khác (lưu chart).

- [x] `/dang-ky` — giữ, dùng để tạo tài khoản lưu lá số
- [x] `/dang-nhap` — giữ, dùng để đăng nhập xem lá số đã lưu
- [x] `AuthButton.tsx` — đổi label "Dùng miễn phí" → "Lưu lá số"

### A4 — Ẩn trang Pricing & Tài khoản ✅
- [x] `/pricing` → redirect `https://anmenh.vutera.net`
- [x] `/tai-khoan` → rewrite thành trang "lá số đã lưu" đơn giản (bỏ subscription UI)
- [x] Xóa link `/pricing` khỏi nav và footer

### A5 — Rewrite CTA text toàn bộ ✅
- [x] `SiteHeader.tsx` — ecosystem banner + AnMenh button
- [x] `SiteFooter.tsx` — ecosystem section, xóa pricing link
- [x] `AuthButton.tsx` — "Dùng miễn phí" → "Lưu lá số"
- [x] `src/app/page.tsx` — xóa AdSlot, thêm AnMenh banner, thêm hero button "AnMenh — Cá nhân hóa"
- [x] `src/app/blog/page.tsx` — xóa ConditionalAdSlot
- [x] `src/app/lien-he/page.tsx` — đổi link `/pricing#faq` → `anmenh.vutera.net/faq`
- [x] `src/app/api/tuvi/export-pdf/route.ts` — xóa VIP gate, PDF export mở cho tất cả

---

## Phase B — Funnel Mechanics ✅

### B1 — AnMenhCTA Component ✅
File: `src/components/funnel/AnMenhCTA.tsx`
- [x] 3 variants: `banner`, `inline`, `card`
- [x] Props: `variant`, `context`, `className`
- [x] Context-aware text: tuvi / phongthuy / ngaytot / horoscope / xemmenh / default
- [x] GA4 tracking (`trackCTAClick`)
> Note: variant `sticky` tách ra thành `StickyCTA.tsx` riêng

### B2 — ContentLock Component ✅
File: `src/components/funnel/ContentLock.tsx`
- [x] Layout: header "🔒 Phần dành riêng", blur items, gradient overlay, CTA button
- [x] Props: `items[]`, `context`, `buttonText`, `className`
- [x] GA4 tracking (`trackLockView`, `trackLockClick`)
> Chưa gắn vào pages — sẽ làm ở Phase C khi cắt giảm nội dung

### B3 — PersonalDoubtTrigger Component ✅
File: `src/components/funnel/PersonalDoubtTrigger.tsx`
- [x] 2 variants: `subtle` (inline text) và `prominent` (callout box vàng)
- [x] Context-aware text: tuvi / phongthuy / ngaytot / horoscope / default
- [x] Gắn vào: tu-vi, tu-vi-hang-ngay, xem-ngay, phong-thuy

### B4 — Sticky CTA ✅ (minor gap)
File: `src/components/funnel/StickyCTA.tsx`
- [x] Nút nổi góc phải dưới màn hình
- [x] Xuất hiện sau 30% scroll
- [x] Dismiss button (lưu vào sessionStorage)
- [x] Gắn vào `layout.tsx` — active trên tất cả trang
- [ ] Ẩn khi user scroll gần footer ← minor, để Phase C/D

### B5 — Gắn components vào các trang kết quả ✅
- [x] `src/app/tu-vi/page.tsx` — PersonalDoubtTrigger (prominent) + AnMenhCTA (banner)
- [x] `src/app/tu-vi-hang-ngay/page.tsx` — PersonalDoubtTrigger (prominent) + AnMenhCTA (banner)
- [x] `src/app/xem-ngay/page.tsx` — AnMenhCTA (card in sidebar) + PersonalDoubtTrigger (subtle)
- [x] `src/app/phong-thuy/page.tsx` — PersonalDoubtTrigger (prominent) + AnMenhCTA (banner)
- [x] `src/app/xem-menh/page.tsx` — AnMenhCTA (banner)
- [x] `src/app/layout.tsx` — StickyCTA global
- [ ] ContentLock chưa gắn (chờ Phase C — cần cắt giảm nội dung trước)

---

## Phase C — Content Restructure 🟠

**Mục tiêu:** Giảm nội dung hiển thị, viết lại theo tone "partial insight".

### C1 — Giảm nội dung Tử Vi Hàng Ngày
File: `src/components/common/HoroscopeView.tsx`
- [ ] Hiện tại: hiện 5 lĩnh vực + điểm số đầy đủ
- [ ] Mới: hiện Tổng Quan + 1 lĩnh vực ngẫu nhiên, lock 3 lĩnh vực còn lại với ContentLock

### C2 — Giảm nội dung Phong Thủy
File: `src/components/phongthuy/PhongThuyForm.tsx`
- [ ] Hiện tại: đầy đủ Bát Trạch + Cửu Cung + gợi ý nội thất
- [ ] Mới: hiện Bát Trạch (4 hướng tốt/xấu cơ bản), lock Cửu Cung + bố trí chi tiết với ContentLock

### C3 — Giảm nội dung Xem Ngày Tốt
File: `src/components/ngaytot/NgayTotForm.tsx`
- [ ] Hiện tại: full danh sách ngày + điểm số
- [ ] Mới: top 3-5 ngày tốt nhất, lock kết quả còn lại + filter tuổi với ContentLock

### C4 — Giảm nội dung Tử Vi Đẩu Số
File: `src/components/tuvi/TuViChartDisplay.tsx`
- [ ] Hiện tại: lá số đầy đủ + giải nghĩa từng cung + Đại Vận chi tiết
- [ ] Mới: hiện lá số + tên sao (chart grid giữ nguyên), lock giải nghĩa sâu với ContentLock

### C5 — Chuẩn hóa template SEO pages
Pages: `/tu-vi/[congiap]/nam-[year]`, `/phong-thuy/menh-[nguhanh]`
- [ ] Thêm PersonalDoubtTrigger vào giữa bài
- [ ] Thêm ContentLock section
- [ ] Thêm AnMenhCTA (banner) cuối bài
- [ ] Kiểm tra có related articles section

### C6 — StickyCTA ẩn near footer (từ B4)
File: `src/components/funnel/StickyCTA.tsx`
- [ ] Ẩn khi user scroll đến 85% trang (gần footer)

---

## Phase D — Analytics & Optimization 🟠

### D1 — GA4 Funnel Events
File: `src/lib/analytics.ts`
- [ ] Tạo helper functions tập trung:
  ```typescript
  trackContentView(feature, page)
  trackCTAClick(variant, context, position)
  trackContentLockView(context)
  trackAnMenhClick(source)
  ```
- [ ] Replace inline tracking trong AnMenhCTA, ContentLock, StickyCTA bằng helpers

### D2 — A/B Test CTA Text
- [ ] Random variant theo sessionStorage (A/B/C)
- [ ] 3 variants theo PRD
- [ ] Track variant trong GA4 event

### D3 — EcosystemBanner (dismissible)
File: `src/components/funnel/EcosystemBanner.tsx`
- [ ] Banner dismissible ở sidebar desktop
- [ ] "TuVi là một phần của hệ Harmony"

---

## Phase E — Cleanup 🟡

### E1 — Xóa Stripe & Payment
- [ ] Xóa `src/lib/stripe.ts`
- [ ] Xóa `src/app/api/checkout/`
- [ ] Xóa `src/app/api/subscription/`
- [ ] Xóa `src/app/api/webhooks/stripe/`
- [ ] Xóa `stripe` khỏi `package.json`

### E2 — Xóa Feature Gating
- [ ] Xóa `src/lib/feature-gating.ts`
- [ ] Xóa `src/lib/middleware/feature-gate-middleware.ts`
- [ ] Xóa `src/components/common/ConditionalAdSlot.tsx`
- [ ] Xóa `src/components/common/AdSlot.tsx`
- [ ] Xóa `src/data/pricing.ts`

### E3 — Xóa Subscription UI & API
- [ ] Xóa `src/app/tai-khoan/SubscriptionActions.tsx` (component cũ)
- [ ] Xóa pricing-related imports còn sót

### E4 — Update DB Schema
- [ ] Xóa `subscription`, `subExpiresAt` fields từ User model
- [ ] Xóa `SearchHistory` model
- [ ] Tạo Prisma migration
- [ ] Update types

### E5 — Update Tests
- [ ] Xóa hoặc skip `pricing.test.ts`
- [ ] Fix pre-existing errors trong `tuvi-engine.test.ts`, `ngu-hanh-engine.test.ts`

---

## Thứ tự thực hiện khuyến nghị

```
Phase A ✅  → Đã xong
Phase B ✅  → Đã xong (trừ ContentLock placement)
Phase C     → Tiếp theo: cắt nội dung + gắn ContentLock
Phase D     → Song song hoặc sau C
Phase E     → Cuối cùng sau khi test A+B+C xong
```

---

## Files đã thêm mới

```
src/components/funnel/
  AnMenhCTA.tsx         ✅
  ContentLock.tsx       ✅ (chưa gắn vào pages)
  PersonalDoubtTrigger.tsx ✅
  StickyCTA.tsx         ✅
docs/
  PRD.md                ✅
```

## Files đã update

```
src/components/layout/SiteHeader.tsx      ✅
src/components/layout/SiteFooter.tsx      ✅
src/components/layout/AuthButton.tsx      ✅
src/components/tuvi/TuViForm.tsx          ✅ (bỏ userTier)
src/components/tuvi/TuViChartDisplay.tsx  ✅ (bỏ userTier)
src/components/tuvi/TuViPdfExportButton.tsx ✅ (bỏ VIP gate)
src/app/layout.tsx                        ✅ (thêm StickyCTA)
src/app/page.tsx                          ✅ (bỏ AdSlot, thêm AnMenh banner)
src/app/tu-vi/page.tsx                    ✅ (thêm funnel components)
src/app/tu-vi-hang-ngay/page.tsx          ✅ (thêm funnel components)
src/app/xem-ngay/page.tsx                 ✅ (thêm funnel components)
src/app/phong-thuy/page.tsx               ✅ (thêm funnel components)
src/app/xem-menh/page.tsx                 ✅ (thêm AnMenhCTA)
src/app/blog/page.tsx                     ✅ (xóa AdSlot)
src/app/lien-he/page.tsx                  ✅ (đổi /pricing#faq → AnMenh)
src/app/tai-khoan/page.tsx                ✅ (rewrite — bỏ subscription UI)
src/app/pricing/page.tsx                  ✅ (redirect → AnMenh)
src/app/api/tuvi/export-pdf/route.ts      ✅ (xóa VIP gate)
```

## Files sẽ xóa (Phase E)

```
src/lib/stripe.ts
src/lib/feature-gating.ts
src/lib/middleware/feature-gate-middleware.ts
src/components/common/ConditionalAdSlot.tsx
src/components/common/AdSlot.tsx
src/data/pricing.ts
src/app/tai-khoan/SubscriptionActions.tsx
src/app/api/checkout/
src/app/api/subscription/
src/app/api/webhooks/stripe/
```

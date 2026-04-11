# Kế hoạch triển khai — TuVi v2.0 (Funnel Pivot)

**Cập nhật:** 11 tháng 4, 2026  
**Tổng tiến độ:** ~15% (pivot mới)  
**Mục tiêu:** Chuyển TuVi từ subscription product → free traffic engine + funnel sang AnMenh

> Xem chiến lược đầy đủ tại [PRD.md](PRD.md)

---

## Tóm tắt phase

| Phase | Nội dung | Ưu tiên | Tiến độ |
|-------|----------|---------|---------|
| A | Chuyển đổi CTA + Ecosystem Nav | 🔴 P0 | ✅ 100% |
| B | Funnel Mechanics (Content Lock + CTA Components) | 🔴 P0 | ✅ 90% |
| C | Content Restructure (Partial insight, template) | 🟠 P1 | ⏳ 0% |
| D | Analytics & Optimization | 🟠 P1 | ⏳ 0% |
| E | Cleanup (xóa subscription/stripe code) | 🟡 P2 | ⏳ 0% |

---

## Phase A — Chuyển đổi CTA + Ecosystem Nav 🔴

**Mục tiêu:** Thay đổi hướng đi của tất cả CTAs, thêm ecosystem navigation.  
**Impact:** Cao / Effort: Thấp — làm ngay.

### A1 — Update Header (SiteHeader.tsx)

- [ ] Thêm nút "→ AnMenh" nổi bật ở header (thay thế hoặc cạnh "Dùng miễn phí")
- [ ] Nút point đến `https://anmenh.vutera.net/`
- [ ] Style: nổi bật, khác màu so với nav links
- [ ] Mobile: hiện trong hamburger menu

### A2 — Update Footer (SiteFooter.tsx)

- [ ] Thêm section "Hệ sinh thái Harmony":
  - 🌐 Harmony → `https://www.vutera.net/harmony`
  - ⭐ TuVi → (trang hiện tại)
  - 🔮 AnMenh → `https://anmenh.vutera.net/`
- [ ] Giữ lại các links hiện tại, chỉ bổ sung

### A3 — Redirect Auth Pages

- [ ] `/dang-ky` → redirect `https://anmenh.vutera.net/dang-ky`
- [ ] `/dang-nhap` → redirect `https://anmenh.vutera.net/dang-nhap`

### A4 — Ẩn trang Pricing & Tài khoản

- [ ] `/pricing` → redirect về trang chủ hoặc AnMenh
- [ ] `/tai-khoan` → redirect `https://anmenh.vutera.net/tai-khoan`
- [ ] Xóa link pricing khỏi nav và footer

### A5 — Rewrite CTA text toàn bộ

Tìm và thay thế trong tất cả components:

| Cũ | Mới |
|----|-----|
| "Dùng miễn phí" | "→ AnMenh" |
| "Nâng cấp Premium" | "Xem bản cá nhân hóa" |
| "Đăng ký ngay" | "Tạo hồ sơ tại AnMenh" |
| "Xem thêm" (CTA) | "Xem kết quả của riêng bạn" |
| Link /dang-ky | https://anmenh.vutera.net/ |

**Files cần check:**
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/layout/AuthButton.tsx`
- `src/app/page.tsx` (hero section)
- `src/app/tu-vi/page.tsx`
- `src/app/xem-ngay/page.tsx`
- `src/app/phong-thuy/page.tsx`
- `src/app/tu-vi-hang-ngay/page.tsx`
- `src/app/xem-menh/page.tsx`

---

## Phase B — Funnel Mechanics 🔴

**Mục tiêu:** Build các components tạo ra "cảm giác thiếu" và drive conversion.

### B1 — AnMenhCTA Component

File: `src/components/funnel/AnMenhCTA.tsx`

Variants:
```typescript
type CTAVariant = 
  | 'banner'    // Banner ngang, cuối trang kết quả
  | 'inline'    // Inline trong nội dung
  | 'sticky'    // Nút nổi khi scroll
  | 'card'      // Card với feature list
```

- [ ] Build component với 4 variants
- [ ] Props: `variant`, `context` (tuvi/phongthuy/ngaytot/horoscope), `className`
- [ ] Text theo context (mỗi tính năng có message phù hợp)
- [ ] Track click event (GA4)

**Nội dung CTA theo context:**

```
Tử Vi:    "Lá số này dựa trên ngày sinh. Thêm giờ sinh để xem chính xác hơn → AnMenh"
Phong Thủy: "Xem hướng bố trí cụ thể theo mệnh của bạn → AnMenh"
Xem Ngày: "Lọc ngày tốt theo tuổi của bạn → AnMenh"  
Hàng Ngày: "Xem đầy đủ 5 lĩnh vực + điểm số của riêng bạn → AnMenh"
```

### B2 — ContentLock Component

File: `src/components/funnel/ContentLock.tsx`

- [ ] Build component hiển thị locked section
- [ ] Layout:
  ```
  [Phần miễn phí — đã xem ở trên]
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔒 Phần dành riêng cho bạn:
  • [item 1 — mờ/blur]
  • [item 2 — mờ/blur]
  • [item 3 — mờ/blur]
  
  → [Tạo hồ sơ tại AnMenh — miễn phí]
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ```
- [ ] Props: `items: string[]` (danh sách nội dung bị lock), `context`
- [ ] Animation: items bị blur gradient

### B3 — PersonalDoubtTrigger Component

File: `src/components/funnel/PersonalDoubtTrigger.tsx`

- [ ] Build inline component
- [ ] Style: subtle callout box (không quá intrusive)
- [ ] Variants:
  ```
  A: "Kết quả này chỉ mang tính tổng quan theo năm sinh.
      Để chính xác hơn, cần thêm giờ sinh của bạn."
  
  B: "Kết quả có thể khác đáng kể tùy theo giờ sinh.
      Xem phiên bản cá nhân hóa tại AnMenh."
  ```

### B4 — Sticky CTA

File: `src/components/funnel/StickyCTA.tsx`

- [ ] Nút nổi ở góc phải/dưới màn hình
- [ ] Xuất hiện sau khi scroll qua 40% trang
- [ ] Ẩn khi user ở gần footer
- [ ] Text: "Xem bản cá nhân →"
- [ ] Dismiss button (lưu vào localStorage, không hiện lại)

### B5 — Gắn components vào các trang kết quả

- [ ] `src/app/tu-vi/page.tsx` — Thêm ContentLock + PersonalDoubtTrigger + AnMenhCTA
- [ ] `src/app/tu-vi-hang-ngay/page.tsx` — Thêm ContentLock + AnMenhCTA
- [ ] `src/app/xem-ngay/page.tsx` — Thêm ContentLock + AnMenhCTA
- [ ] `src/app/phong-thuy/page.tsx` — Thêm ContentLock + AnMenhCTA
- [ ] `src/app/xem-menh/page.tsx` — Thêm AnMenhCTA (end-of-page)
- [ ] Layout root — Thêm StickyCTA (hiện trên các result pages)

---

## Phase C — Content Restructure 🟠

**Mục tiêu:** Giảm nội dung hiển thị, viết lại theo tone "partial insight".

### C1 — Giảm nội dung Tử Vi Hàng Ngày

File: `src/components/common/HoroscopeView.tsx`

- [ ] Hiện tại: hiện 5 lĩnh vực + điểm số đầy đủ
- [ ] Mới: hiện 2 lĩnh vực (Tổng Quan + 1 random), lock 3 lĩnh vực còn lại
- [ ] Lock section gồm tên lĩnh vực + điểm số bị ẩn

### C2 — Giảm nội dung Phong Thủy

File: `src/components/phongthuy/PhongThuyForm.tsx`

- [ ] Hiện tại: hiện đầy đủ Bát Trạch + Cửu Cung + gợi ý nội thất
- [ ] Mới: hiện Bát Trạch (4 hướng tốt, 4 hướng xấu), lock Cửu Cung + bố trí chi tiết

### C3 — Giảm nội dung Xem Ngày Tốt

- [ ] Hiện tại: hiện full danh sách ngày tốt + điểm số
- [ ] Mới: hiện top 3 ngày tốt nhất, lock filter theo tuổi + giải nghĩa chi tiết

### C4 — Giảm nội dung Tử Vi Đẩu Số

File: `src/components/tuvi/TuViChartDisplay.tsx`

- [ ] Hiện tại: hiện đầy đủ lá số + giải nghĩa từng cung + Đại Hạn
- [ ] Mới: hiện lá số + tên sao (50%), lock giải nghĩa sâu và Đại Hạn chi tiết

### C5 — Chuẩn hóa template SEO pages

Pages: `/tu-vi/[congiap]/nam-[year]`, `/phong-thuy/menh-[nguhanh]`

- [ ] Thêm ContentLock vào tất cả SEO pages
- [ ] Thêm PersonalDoubtTrigger vào giữa bài
- [ ] Thêm AnMenhCTA (banner variant) cuối bài
- [ ] Đảm bảo có related articles section

---

## Phase D — Analytics & Optimization 🟠

### D1 — GA4 Funnel Events

File: `src/lib/analytics.ts`

- [ ] Helper functions:
  ```typescript
  trackContentView(feature: string, page: string)
  trackCTAClick(variant: string, position: string, page: string)
  trackContentLockView(feature: string)
  trackAnMenhClick(source: string)
  ```
- [ ] Gắn vào: AnMenhCTA, ContentLock, StickyCTA components

### D2 — A/B Test CTA Text

- [ ] Implement đơn giản (random seed theo userId hoặc sessionStorage)
- [ ] 3 variants: A / B / C (xem PRD.md)
- [ ] Track variant trong GA4 event

### D3 — EcosystemBanner Component

File: `src/components/funnel/EcosystemBanner.tsx`

- [ ] Banner nhỏ xuất hiện ở top trang (dismissible)
- [ ] Text: "TuVi là một phần của hệ Harmony — [Xem thêm]"
- [ ] Hoặc banner trong sidebar cho desktop

---

## Phase E — Cleanup 🟡

**Mục tiêu:** Dọn dẹp code không còn cần thiết.

### E1 — Xóa Stripe & Payment

- [ ] Xóa `src/lib/stripe.ts`
- [ ] Xóa `src/app/api/checkout/`
- [ ] Xóa `src/app/api/subscription/`
- [ ] Xóa `src/app/api/webhooks/stripe/`
- [ ] Xóa `stripe` dependency từ package.json

### E2 — Xóa Feature Gating

- [ ] Xóa `src/lib/feature-gating.ts`
- [ ] Remove tất cả import/usage của feature gating
- [ ] Xóa `src/components/common/ConditionalAdSlot.tsx`
- [ ] Xóa `src/data/pricing.ts` (hoặc archive)

### E3 — Xóa Subscription UI

- [ ] Xóa `src/app/pricing/`
- [ ] Xóa `src/app/tai-khoan/` (subscription management parts)
- [ ] Xóa pricing-related components

### E4 — Simplify Auth

- [ ] Quyết định: giữ auth cho analytics tracking, hay bỏ hoàn toàn?
- [ ] Nếu giữ: chỉ dùng cho lưu lá số, không gate content
- [ ] Nếu bỏ: xóa toàn bộ auth flow

### E5 — Update DB Schema

- [ ] Xóa `subscription`, `subExpiresAt` fields từ User model
- [ ] Xóa `SearchHistory` model
- [ ] Tạo migration mới
- [ ] Update types

### E6 — Update Tests

- [ ] Xóa/skip tests liên quan đến pricing, feature gating, subscription
- [ ] Update `pricing.test.ts` hoặc xóa

---

## Thứ tự thực hiện khuyến nghị

```
Phase A (1-2 ngày)   → Impact ngay, ít risk
Phase B (3-5 ngày)   → Core funnel mechanics
Phase C (3-4 ngày)   → Content restructure
Phase D (1-2 ngày)   → Analytics (có thể song song C)
Phase E (2-3 ngày)   → Cleanup (làm sau khi test A+B+C xong)
```

**Deploy sau Phase A+B** để test conversion sớm, tiếp tục C/D/E sau.

---

## Files chính cần thay đổi

### Thêm mới
```
src/components/funnel/
  AnMenhCTA.tsx
  ContentLock.tsx
  PersonalDoubtTrigger.tsx
  StickyCTA.tsx
  EcosystemBanner.tsx
src/lib/analytics.ts
```

### Update
```
src/components/layout/SiteHeader.tsx
src/components/layout/SiteFooter.tsx
src/components/layout/AuthButton.tsx
src/app/page.tsx
src/app/tu-vi/page.tsx
src/app/tu-vi-hang-ngay/page.tsx
src/app/xem-ngay/page.tsx
src/app/phong-thuy/page.tsx
src/app/xem-menh/page.tsx
src/components/common/HoroscopeView.tsx
src/components/tuvi/TuViChartDisplay.tsx
src/components/phongthuy/PhongThuyForm.tsx
```

### Xóa / Redirect
```
src/app/pricing/            → redirect
src/app/tai-khoan/          → redirect AnMenh
src/app/dang-ky/            → redirect AnMenh
src/app/dang-nhap/          → redirect AnMenh
src/lib/stripe.ts           → xóa
src/lib/feature-gating.ts   → xóa
src/data/pricing.ts         → xóa
src/app/api/checkout/       → xóa
src/app/api/subscription/   → xóa
src/app/api/webhooks/stripe → xóa
```

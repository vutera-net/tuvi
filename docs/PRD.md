# PRD: TuVi — Traffic Engine & Funnel sang AnMenh

**Phiên bản:** 2.0 — Pivot chiến lược  
**Cập nhật:** 11 tháng 4, 2026  
**Trạng thái:** Approved

---

## 1. Bối cảnh & Định vị chiến lược

### Hệ sinh thái Harmony (vutera.net)

```
Harmony (www.vutera.net/harmony)
├── TuVi (tuvi.vutera.net)     ← Traffic Engine / SEO
└── AnMenh (anmenh.vutera.net) ← Core Product / Retention
```

Ba sản phẩm phục vụ ba vai trò riêng biệt:

| Sản phẩm | Vai trò | Mục tiêu |
|----------|---------|-----------|
| **Harmony** | Brand umbrella | Định vị hệ sinh thái |
| **TuVi** | Traffic Engine + Funnel | Drive user → AnMenh |
| **AnMenh** | Core Product | Personalized insights, retention, monetization |

### Định nghĩa lại TuVi

**TuVi không phải:**
- ❌ Web tử vi hoàn chỉnh
- ❌ Nơi user ở lại lâu dài
- ❌ Sản phẩm có subscription riêng

**TuVi là:**
- ✅ Cỗ máy tạo cảm giác "đúng nhưng chưa đủ"
- ✅ Traffic Engine — SEO → thu hút user organic
- ✅ Funnel — tạo nhu cầu cá nhân hóa → convert sang AnMenh

---

## 2. Mục tiêu sản phẩm

### Mục tiêu chính
1. **SEO traffic** — xuất hiện top Google cho các keyword tử vi/phong thủy/ngày tốt xấu
2. **Funnel conversion** — % user click CTA sang AnMenh
3. **Brand awareness** — định vị Harmony ecosystem

### KPIs

| Metric | Mục tiêu |
|--------|----------|
| Organic traffic | Top 10 keyword "xem ngày tốt xấu", "tử vi hôm nay" |
| CTA click rate | ≥ 8% user click CTA sang AnMenh |
| AnMenh conversion | ≥ 3% user TuVi đăng ký AnMenh |
| Bounce reduction | User đọc ≥ 2 trang/session |

---

## 3. User Flow mục tiêu

```
Google Search
     ↓
TuVi (đọc miễn phí — nội dung chung, 40-60%)
     ↓
"Đúng phết... nhưng chưa phải của mình"
     ↓
Click CTA → "Xem bản cá nhân hóa"
     ↓
AnMenh (đăng ký/đăng nhập)
     ↓
Dashboard cá nhân — insight theo giờ sinh, mệnh, chu kỳ
     ↓
Quay lại hàng ngày
```

---

## 4. Nội dung & Phân tầng (Content Strategy)

### Nguyên tắc cốt lõi

> **Rule 1:** TuVi tồn tại để "chưa đủ", không phải để "đúng"  
> **Rule 2:** Nếu user cảm thấy đủ → funnel chết  
> **Rule 3:** Mọi nội dung phải dẫn đến: "Cái này đúng… nhưng chưa phải của mình"

### Phân tầng nội dung

| Level | Nơi | Nội dung |
|-------|-----|----------|
| **Free (TuVi)** | Công khai | Theo năm sinh, theo ngày, nội dung chung (40-60%) |
| **Personalized (AnMenh)** | Sau đăng ký | Theo giờ sinh, theo mệnh, chu kỳ cá nhân, cảnh báo |

### Template bài viết chuẩn

```
1. Hook / Intro
      ↓
2. Nội dung chung (40-60%)
      ↓
3. Partial Insight (gợi mở, chưa kết luận)
      ↓
4. "Personal Doubt Trigger" — "Kết quả này chỉ đúng ~60%..."
      ↓
5. Content Lock — "🔒 Phần dành riêng cho bạn"
      ↓
6. CTA → AnMenh
      ↓
7. Related articles (internal linking)
```

### Tone nội dung

❌ Sai: "Hôm nay bạn sẽ gặp may mắn trong tài chính."  
✅ Đúng: "Bạn có xu hướng thuận lợi về tài chính, tuy nhiên điều này còn phụ thuộc vào chu kỳ cá nhân của bạn."

---

## 5. Các tính năng giữ lại / thay đổi

### Giữ lại (free, không cần auth)

| Tính năng | Nội dung hiện thi | Ghi chú |
|-----------|-------------------|---------|
| Lịch Vạn Niên | Đầy đủ (công cụ thuần túy) | Core SEO |
| Xem Mệnh Ngũ Hành | Mệnh + màu sắc + hướng (70%) | Lock "hợp mệnh 2 người" |
| Tử Vi Đẩu Số | Lá số cơ bản + tên sao (50%) | Lock giải nghĩa sâu, Đại Hạn chi tiết |
| Xem Ngày Tốt | Danh sách ngày + điểm số (60%) | Lock filter theo tuổi, giải nghĩa cụ thể |
| Phong Thủy | Cung mệnh + hướng tốt/xấu (60%) | Lock Cửu Cung, bố trí nội thất |
| Tử Vi Hàng Ngày | Tổng quan 1-2 lĩnh vực (40%) | Lock 5 lĩnh vực + điểm số |
| Blog / SEO pages | Đầy đủ | Traffic engine |

### Loại bỏ

- ❌ Subscription tiers (Free/Premium/VIP)
- ❌ Stripe payment integration
- ❌ Feature gating nội bộ
- ❌ Trang `/pricing`
- ❌ Trang `/tai-khoan` (subscription management)
- ❌ AdSense slots
- ❌ Auth trên TuVi (đăng ký/đăng nhập → redirect AnMenh)

### Thêm mới

| Tính năng | Mô tả | Priority |
|-----------|-------|----------|
| **Ecosystem Nav** | Header/Footer: Harmony ↔ TuVi ↔ AnMenh | 🔴 P0 |
| **Content Lock** | Gated insight section + CTA AnMenh | 🔴 P0 |
| **Personal Doubt Trigger** | Inline text "kết quả chỉ đúng ~60%" | 🔴 P0 |
| **CTA Component** | Tái sử dụng được, nhiều variants | 🔴 P0 |
| **Sticky CTA** | Nút nổi "Xem bản cá nhân" | 🟠 P1 |
| **Funnel Tracking** | GA4 events: view → CTA click → AnMenh | 🟠 P1 |
| **Input nhẹ** | Chọn năm sinh/giới tính → show kết quả → gate save | 🟡 P2 |
| **Progressive Reveal** | Scroll/click để mở nội dung | 🟡 P2 |
| **Compare Mode** | "Kết quả chung vs. cá nhân (cần đăng ký)" | 🟡 P2 |

---

## 6. CTA Strategy

### Nguyên tắc CTA

- Phải có từ: **"cá nhân"**, **"chính xác"**, **"của bạn"**
- Điểm đến: `https://anmenh.vutera.net/`
- Không dùng: "Xem thêm", "Khám phá tiếp", "Nâng cấp"

### CTA Variants (A/B test)

```
A: "Xem bản cá nhân hóa chính xác hơn"
B: "Xem kết quả của riêng bạn"
C: "Mở khóa vận mệnh của bạn"
```

### Vị trí CTA bắt buộc

1. **End-of-page CTA** — sau mỗi trang kết quả (Tu Vi, Xem Ngày, Phong Thủy, Tử Vi Hàng Ngày)
2. **Content Lock section** — giữa trang, sau partial insight
3. **Sticky CTA** — nút nổi khi scroll qua 40% trang
4. **Sidebar/banner** — "Muốn trải nghiệm sâu hơn? → AnMenh"
5. **Inline trong nội dung** — liên kết text tự nhiên

---

## 7. Ecosystem Navigation

### Header

```
[☯ Harmony Tử Vi]  |  Lịch  Xem Mệnh  Tử Vi  Xem Ngày  Phong Thủy  Blog
                                                                    [→ AnMenh]
```

### Footer — Thêm section mới

```
Hệ sinh thái Harmony
├── 🌐 Harmony (vutera.net/harmony)
├── ⭐ TuVi (tuvi.vutera.net)  ← đang ở đây
└── 🔮 AnMenh (anmenh.vutera.net) — Cá nhân hóa sâu hơn
```

### Banner trong trang

```
"TuVi là một phần của hệ Harmony — nền tảng phong thủy tử vi toàn diện nhất cho người Việt"
```

---

## 8. Funnel Tracking

### GA4 Events cần đo

| Event | Trigger | Parameters |
|-------|---------|------------|
| `tuvi_content_view` | User xem trang kết quả | `page_type`, `feature` |
| `tuvi_cta_click` | Click bất kỳ CTA nào | `cta_variant`, `position`, `page` |
| `tuvi_content_lock_view` | Thấy content lock section | `feature`, `page` |
| `tuvi_anmenh_click` | Click link sang AnMenh | `source` |

### Funnel mục tiêu

```
100% View trang
 ↓ 40-60% Scroll qua content lock
 ↓ 8-15% Click CTA
 ↓ 3-5% Đăng ký AnMenh
```

---

## 9. Technical Changes

### Xóa

```
src/app/pricing/            → Xóa trang
src/app/tai-khoan/          → Xóa trang  
src/app/dang-ky/            → Redirect sang anmenh.vutera.net/dang-ky
src/app/dang-nhap/          → Redirect sang anmenh.vutera.net/dang-nhap
src/lib/stripe.ts           → Xóa
src/lib/feature-gating.ts   → Xóa (thay bằng content-lock strategy)
src/components/common/ConditionalAdSlot.tsx → Xóa
src/app/api/checkout/       → Xóa
src/app/api/subscription/   → Xóa
src/app/api/webhooks/stripe → Xóa
```

### Thêm

```
src/components/funnel/
  ├── AnMenhCTA.tsx          — CTA component (variants: banner, inline, sticky, lock)
  ├── ContentLock.tsx        — Gated insight section
  ├── PersonalDoubtTrigger.tsx — "Kết quả chỉ đúng ~60%..." inline block
  └── EcosystemBanner.tsx    — "TuVi là một phần của Harmony"

src/components/layout/
  ├── SiteHeader.tsx         — Update: thêm AnMenh button, ecosystem links
  └── SiteFooter.tsx         — Update: thêm ecosystem section

src/lib/
  └── analytics.ts           — GA4 funnel event helpers
```

### Update DB Schema

- Xóa: Subscription fields trong User model (`subscription`, `subExpiresAt`)
- Xóa: `SearchHistory` model (premium-only feature)
- Giữ: `TuViChart`, `DailyHoroscope`, `DailyCalendar` (caching)
- Giữ: `User` (cho auth cơ bản nếu cần save chart)

> **Lưu ý:** Có thể giữ auth nhẹ trên TuVi để track user cho analytics, nhưng không bắt buộc đăng ký để dùng bất kỳ tính năng gì.

---

## 10. Migration path

### Ưu tiên triển khai

**Phase A — Chuyển đổi ngay (impact cao, ít code)**
1. Thay CTA text + đích đến (AnMenh thay vì /dang-ky)
2. Thêm ecosystem nav (Header + Footer)
3. Ẩn trang `/pricing`, `/tai-khoan`

**Phase B — Funnel mechanics**
4. Build `ContentLock` component
5. Thêm `PersonalDoubtTrigger` vào tất cả trang kết quả
6. Build `AnMenhCTA` sticky + end-of-page

**Phase C — Content restructure**
7. Giảm nội dung hiển thị về 40-60%
8. Chuẩn hóa template tất cả pages
9. Rewrite content theo tone "partial insight"

**Phase D — Analytics & Optimization**
10. Implement GA4 funnel events
11. A/B test CTA variants
12. Progressive reveal UI

**Phase E — Cleanup**
13. Xóa Stripe, feature gating, subscription code
14. Update DB schema
15. Update auth flow → redirect AnMenh

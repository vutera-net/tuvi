# Kế hoạch triển khai — TuVi v2.0 (Funnel Pivot)
**Trạng thái:** ✅ HOÀN THÀNH 100%

## Các hạng mục đã thực hiện:

### 1. Funnel Components & Content Locking
- [x] Tích hợp `ContentLock` vào Horoscope, Phong Thủy, Xem Ngày, Tử Vi.
- [x] Triển khai `PersonalDoubtTrigger` tăng tỷ lệ click-through.
- [x] Cấu hình `AnMenhCTA` đa dạng (Banner, Inline, Card).

### 2. Analytics & A/B Testing
- [x] Hoàn thiện `src/lib/analytics.ts` cho tracking GA4.
- [x] Cài đặt A/B Testing cho nội dung CTA (A/B/C variants).
- [x] Thêm `EcosystemBanner` tăng nhận diện thương hiệu Vutera.

### 3. Hệ thống & Cleanup
- [x] Loại bỏ hoàn toàn Stripe, Auth, Subscription code.
- [x] Chuyển đổi Database sang Stateless (xóa User models).
- [x] Xóa bỏ 15+ files rác và code logic cũ.

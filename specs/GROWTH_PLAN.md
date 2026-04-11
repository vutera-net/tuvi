# Kế Hoạch Tăng Trưởng & Tối Ưu Phễu (Growth Action Plan)

Bản theo dõi tiến độ chi tiết dựa trên phân tích ở `product_evaluation.md`. Mọi nỗ lực tính từ điểm này sẽ nằm ở việc Tối đa hóa Chuyển đổi và Mở rộng vùng phủ SEO.

---

## 1. Mượt mà Luồng Chuyển Đổi (Friction Leakage)
*Mục tiêu: Đưa user sang AnMệnh một cách tự nhiên, liên tục mạch suy nghĩ.*

- [x] **[TuVi]** Bổ sung Query Parameters (`?source`, `?intent`, `?birthYear`) vào tất cả Component chốt sale (`AnMenhCTA`, `ContentLock`, `PersonalDoubtTrigger`).
- [ ] **[AnMenh]** Thiết kế & Lập trình một trang Dynamic Bridge Page trên nhánh `anmenh.vutera.net/bridge` để đón lõng và xử lý các tham số được bắn sang.  
  *(Lưu ý: Việc này cần thực hiện bên phía dự án AnMệnh, đảm bảo nhận diện các tham số: source, intent, birthYear, gender)*
- [ ] **[Vutera]** Setup tracking chéo (Cross-domain tracking GA4) để biết click ở TuVi có convert thật sự ra đăng ký ở AnMenh không.

## 2. Trí nhớ Ẩn (Cookieless Memory)
*Mục tiêu: Tránh người dùng phải điền một form thông tin nhiều lần, cá nhân hóa UX.*

- [x] **[TuVi]** Tạo Hook (`useSessionMemory.ts`) lưu trữ vào LocalStorage.
- [x] **[TuVi]** Component `TuViForm`, `PhongThuyForm` tự động nhận diện dữ liệu bộ nhớ cũ (Năm Sinh, Giới tính) ngay khi load.
- [x] **[TuVi]** Form tự đồng bộ ghi ngược dữ liệu xuống Memory sau hành động "Submit".

## 3. Tâm Lý Học Thao Túng (Curiosity Gap)
*Mục tiêu: Kích hoạt nỗi sợ (FOMO) bằng nghệ thuật giấu thông tin nửa chừng.*

- [ ] Lên danh sách các kịch bản kích thích nổi đau / rủi ro vào các điểm `ContentLock` (VD: "Có hạn mất tiền tại Tài Bạch tháng tới. Xin giờ sinh thật để gỡ.")
- [ ] Áp dụng các Mini-Funnel gieo quẻ cực nhanh: Kéo thả 1 chạm -> hiện 1 phần quẻ -> yêu cầu ấn sang AnMệnh xem tiếp.
- [ ] Triển khai A/B Testing 3 mẫu text của CTA Button.

## 4. Cỗ Máy Programmatic SEO (Vũ khí hàng nặng)
*Mục tiêu: Tạo hàng trăm ngàn trang vệ tinh bắt các từ khóa Long-tail ngách.*

- [ ] Lập cấu trúc Template và Matrix Schema (Ví dụ: `tuổi [X] / sao [Y] / cung [Z]`).
- [ ] Phát triển hệ thống Dynamic Route tự động sinh ra Content và Meta Tags chuẩn SEO cho hệ số tổ hợp lên tới hàng nghìn bài học.
- [ ] Thiết lập hệ thống chằng chịt Internal Links, biến mọi danh từ chuyên môn thành link dẫn nhau để trói chân Bot Google.
- [ ] Bật `generateStaticParams` hoàn chỉnh và submit Sitemap khổng lồ lên Search Console.

## 5. Tối ưu Sinh Tồn (Core Web Vitals)
*Mục tiêu: Tốc độ load < 1 giây để ăn trọn điểm Rank Google.*

- [ ] Offload các logic tính toán nặng của Tử Vi sang phía Server Components thuần túy hoặc Web Workers.
- [ ] Ứng dụng Redis Caching hoặc Vercel Edge cho các kết quả truy vấn trùng lặp cùng năm sinh/thời điểm.
- [ ] Kiểm toán JavaScript, gỡ bỏ thư viện dư thừa, đảm bảo Lighthouse 95+ tất cả các trang đích.

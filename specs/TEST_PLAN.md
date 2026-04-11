# Test Plan: Harmony Tử Vi v2.0 (Growth & SEO)

## 1. Tổng quan (Overview)
Tài liệu này xác định kế hoạch kiểm thử toàn diện cho dự án Harmony Tử Vi, tập trung vào độ chính xác của các công cụ tính toán phong thủy, hiệu quả của phễu chuyển đổi (Conversion Funnel) và tính toàn vẹn của hệ thống SEO Ma trận.

## 2. Phạm vi kiểm thử (Scope)

### 2.1. Kiểm thử chức năng (Functional Testing)
Kiểm tra tính chính xác của các engine cốt lõi:
- **Lunar Engine**: Chuyển đổi Âm Dương, Tiết khí, Giờ Hoàng Đạo.
- **TuVi Engine**: Lập lá số dựa trên thư viện `iztro`, Nạp âm, Cục, Đại hạn/Tiểu hạn.
- **TuVi Interpreter**: Tính đúng đắn của việc truy xuất ý nghĩa sao tại các cung.

### 2.2. Kiểm thử Phễu chuyển đổi (Growth & Funnel)
- **MiniFunnel**: Luồng "Gieo quẻ 1 giây", hiệu ứng loding, và link dẫn về AnMệnh.
- **ContentLock**: Hiển thị nhãn Premium, tính cá nhân hóa của tiêu đề.
- **PersonalDoubtTrigger**: Kiểm tra việc lấy dữ liệu năm sinh từ Session Memory để render text cảnh báo.
- **AnMenh Handoff**: Xác soát các URL Params (`?source`, `?intent`, `?birthYear`) khi click CTA.

### 2.3. Kiểm thử Programmatic SEO
- **Matrix Pages (168 trang)**: Kiểm tra render nội dung thực tế (Overview, Fortune, Advice).
- **Internal Linking**: Các tên sao trên lá số có trỏ đúng slug `/y-nghia-sao/[sao]-tai-cung-[cung]`.
- **Sitemap & Robots**: Kiểm tra sự hiện diện của 168 link ma trận trong `sitemap.xml`.

### 2.4. Hiệu năng & SEO (Performance & Technical SEO)
- **Lighthouse Score**: Đảm bảo Performance > 90, SEO = 100.
- **SSG Verification**: Kiểm tra tốc độ tải trang tra cứu (phải đạt mức instant).
- **Metadata**: Title/Description của các trang ma trận phải khớp với nội dung.

## 3. Kịch bản kiểm thử chi tiết (Test Cases)

| ID | Thành phần | Mô tả kịch bản | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **TC01** | TuVi Form | Nhập ngày sinh 15/06/1990, Giờ Ngọ, Nam | Lá số hiển thị đúng Cục (Thổ Ngũ Cục), Mệnh (Lộ Bàng Thổ). |
| **TC02** | Session Memory | Đổi năm sinh trên Form xem ngày | Các component `PersonalDoubtTrigger` trên toàn trang phải cập nhật text theo năm sinh mới. |
| **TC03** | MiniFunnel | Click "Gieo quẻ" trên Home | Hiển thị hiệu ứng tính toán trong 1-2s rồi hiện kết quả sơ bộ + Button sang AnMệnh. |
| **TC04** | Matrix Link | Click vào chữ "Tử Vi" tại cung "Mệnh" | Browser chuyển hướng đến `/y-nghia-sao/tu-vi-tai-cung-menh`. |
| **TC05** | ContentLock | Chưa nhập info, xem trang ý nghĩa sao | Hiển thị Banner khóa nội dung với thông điệp: "Hãy nhập thông tin để nhận giải mã cá nhân hóa". |
| **TC06** | Handoff Params | Click "Xem đầy đủ trên AnMệnh" | URL của AnMệnh phải có `?source=tuvi_growth&birthYear=1990...`. |
| **TC07** | SSG Check | Truy cập link ma trận bất kỳ | Trang hiện ra ngay lập tức, không có hiện tượng giật (layout shift). |

## 4. Môi trường kiểm thử (Testing Environment)
- **Thiết bị**: Desktop (Chrome/Edge), Mobile (Safari/Chrome iOS/Android).
- **Network**: Thử nghiệm với băng thông thấp (3G/4G) để test hiệu quả caching.
- **Tools**: Google Lighthouse, PageSpeed Insights, Meta SEO Inspector.

## 5. Tiêu chí vượt qua (Pass Criteria)
- 100% các trang ma trận render được nội dung (không bị 404 hoặc trống trơn).
- Tốc độ tải trang tra cứu đạt < 1.0s (Lighthouse Performance > 90).
- Tham số truyền sang AnMệnh đầy đủ, không bị lỗi cú pháp URL.

## 6. Ghi chú lỗi (Issue Bug Report)
Tất cả lỗi được log vào file `ISSUE_LOG.md` theo format:
- **Tên lỗi** | **Mức độ** | **Tình trạng** | **Mô mô chi tiết**.

# Implementation Plan: Automated Testing Execution

Dựa trên yêu cầu của người dùng, tôi sẽ tự chủ thực hiện việc chạy ứng dụng và kiểm thử tự động toàn bộ phễu chuyển đổi cũng như hệ thống SEO Ma trận.

## 1. Mục tiêu (Objectives)
- Khởi chạy môi trường phát triển (Dev Server).
- Sử dụng Browser SubAgent để mô phỏng hành vi người dùng thực tế.
- Xác nhận các tính năng "Growth" hoạt động chính xác theo [TEST_PLAN.md](file:///\\wsl.localhost\Ubuntu\home\linh\Projects\vutera.net\tuvi\specs\TEST_PLAN.md).
- Báo cáo kết quả và log lỗi (nếu có).

## 2. Các bước thực hiện (Proposed Steps)

### Giai đoạn 1: Chuẩn bị môi trường
- Chạy lệnh `npm run dev` trong background.
- Kiểm tra tính sẵn sàng của server tại `http://localhost:3000`.

### Giai đoạn 2: Thực thi kiểm thử (Browser SubAgent)
Tôi sẽ triệu hồi Browser SubAgent để thực hiện các kịch bản sau:

**Kịch bản A: Kiểm thử Chức năng chính & Session Memory**
1. Truy cập trang `/tu-vi`.
2. Nhập thông tin: `Nguyễn Văn Test`, `15/06/1990`, `Nam`, `Giờ Ngọ`.
3. Submit và kiểm tra lá số có hiển thị không.
4. Quay lại trang chủ và kiểm tra xem `PersonalDoubtTrigger` có hiển thị text cá nhân hóa *"Với tuổi Canh Ngọ (1990)..."* không.

**Kịch bản B: Kiểm thử MiniFunnel & Handoff**
1. Tại trang chủ, tìm đến widget "Gieo quẻ 1 giây".
2. Click "BẮT ĐẦU GIEO QUẺ".
3. Đợi tiến trình đạt 100% và hiển thị kết quả.
4. Kiểm tra nút "XEM CHI TIẾT CÁCH HÓA GIẢI" có trỏ về AnMenh với đầy đủ Params không.

**Kịch bản C: Kiểm thử SEO Matrix & Internal Links**
1. Quay lại trang `/tu-vi` đã có kết quả lá số.
2. Click vào link "Tử Vi" trong một cung bất kỳ.
3. Xác nhận đã chuyển hướng đến trang `/y-nghia-sao/...`.
4. Kiểm tra trang mới có hiển thị nội dung phân tích (Overview, Fortune, Advice) và Banner ContentLock không.

### Giai đoạn 3: Tổng hợp kết quả
- Ghi nhận trạng thái Pass/Fail cho từng Test Case.
- Lưu ảnh chụp màn hình/video từ Browser SubAgent làm bằng chứng.
- Viết báo cáo tổng kết.

## 3. Rủi ro & Giải pháp (Risks & Mitigations)
- **Rủi ro**: Server không khởi chạy kịp hoặc cổng 3000 bị chiếm.
- **Giải pháp**: Kiểm tra process và kill port nếu cần trước khi chạy.
- **Rủi ro**: Redis bị thiếu (nhưng app đã có cơ chế fallback nên vẫn test được chức năng).

## 4. Câu hỏi mở (Open Questions)
- User có muốn tôi test trên kích thước màn hình Mobile (iPhone 12/13) hay mặc định Desktop?
- Có cần ghi lại console logs của trình duyệt khi gặp lỗi không?

> [!IMPORTANT]
> Tôi sẽ bắt đầu chạy server ngay sau khi bạn đồng ý với kế hoạch này.

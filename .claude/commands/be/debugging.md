Đọc trước: `CLAUDE.md`.

Tôi cung cấp ngữ cảnh lỗi: $ARGUMENTS

Hãy:
1. Phân tích log, stack traces và khám phá codebase để xác định nguyên nhân gốc rễ
2. Tạo bug report tại `docs/bugs/YYYY-MM-DD-ten-loi.md` (dùng ngày thực tế, tên lỗi dạng kebab-case) với nội dung:
   - **Tiêu đề**
   - **Mô tả lỗi**
   - **Các bước tái hiện**
   - **Kết quả thực tế vs Kỳ vọng**
   - **Root cause analysis**
   - **Đề xuất fix** (chưa implement)
3. Nếu thư mục `docs/bugs/` chưa tồn tại, tạo mới

Quy tắc:
- CHƯA sửa code — chỉ phân tích và document
- Mỗi bug là một file riêng để giữ lịch sử, không overwrite

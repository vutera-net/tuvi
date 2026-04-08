Đọc trước: `CLAUDE.md` để hiểu architecture, conventions và layer rules của project.

Mục tiêu / phạm vi cần optimize: $ARGUMENTS
(Nếu không có argument, phân tích toàn bộ codebase)

Hãy:
1. Phân tích architecture hiện tại — map đúng với layer rules trong CLAUDE.md
2. Liệt kê vấn đề theo priority:
   - 🔴 Critical: security, data loss, production-breaking
   - 🟡 High: performance bottleneck, anti-pattern nghiêm trọng
   - 🟢 Low: code quality, readability, tech debt nhỏ
3. Đề xuất cải thiện cụ thể với lý do rõ ràng
4. Refactor nếu phạm vi nhỏ và an toàn — không rewrite toàn bộ
5. Nếu thay đổi lớn, trình bày migration plan theo từng bước

Quy tắc:
- Ưu tiên backward compatibility — không break API đang có
- Không thêm abstraction không cần thiết
- Chỉ thay đổi trong phạm vi được yêu cầu
- Nếu phát hiện security issue, báo cáo ngay và ưu tiên fix trước

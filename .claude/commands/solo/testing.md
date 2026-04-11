Đọc trước: `CLAUDE.md`, `docs/TEST_PLAN.md`.

Thực hiện quy trình kiểm thử tự động:

1. Dùng compiler/type-checker quét và sửa toàn bộ lỗi Type và Syntax trước
2. Chạy test theo từng nhóm trong `docs/TEST_PLAN.md`
3. Dùng sub-agents thực hiện song song các nhóm test độc lập
4. Liên tục cập nhật kết quả vào `docs/TEST_PLAN.md`: ✅ pass / ❌ fail
5. Nếu có lỗi, tự động sửa (auto-fix) và test lại
6. Báo cáo tổng kết khi hoàn thành: số pass/fail, coverage %

Quy tắc:
- Sửa code chỉ khi test fail do bug thật, không phải do test viết sai
- Nếu cần thay đổi lớn để test pass, báo cáo và hỏi trước khi làm

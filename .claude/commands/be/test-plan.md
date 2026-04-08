Đọc trước: `CLAUDE.md`, `docs/IMPLEMENTATION_PLAN.md`.

Code cơ bản đã hoàn thành. Hãy dừng việc code tính năng mới.

Viết `docs/TEST_PLAN.md` bao gồm:
1. Test cases từ Unit Test → Integration Test → E2E (theo thứ tự)
2. Mỗi test case có checkbox [ ] để theo dõi tiến độ
3. Mỗi case ghi rõ: input, expected output, edge cases quan trọng
4. Nhóm theo module/feature, không theo loại test — dễ track theo feature

Quy tắc:
- Focus vào business logic, không test framework internals
- Ưu tiên coverage cho các flow quan trọng: auth, payment, core features
- Đánh dấu rõ test nào cần mock, test nào cần real DB

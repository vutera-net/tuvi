Đọc trước: `CLAUDE.md`, `docs/TEST_PLAN.md` (phần Integration/E2E nếu có).

Module cần test: $ARGUMENTS
(Ví dụ: `/test:e2e auth`, `/test:e2e topics`. Nếu không có argument, test tất cả modules.)

Mỗi module = 1 file `test/<module>.e2e-spec.ts` = 1 user flow hoàn chỉnh theo thứ tự thực tế.
Không tạo file riêng per-endpoint — các bước trong flow dùng chung state (token, IDs) với nhau.

## Quy trình thực hiện

### Bước 1 — Chuẩn bị môi trường
- Dùng `mongodb-memory-server` để khởi động DB in-memory (install nếu thiếu: `npm i -D mongodb-memory-server`)
- Không dùng real DB — in-memory cho phép chạy song song, tự cleanup, không cần setup ngoài
- Seed data tối thiểu cần thiết trong `beforeAll` của từng spec (không dùng `scripts/seed.js` — quá nhiều data)

### Bước 2 — Generate e2e spec files
- Tạo/cập nhật file `test/<module>.e2e-spec.ts` cho từng module được yêu cầu
- Mỗi spec file phải có: `beforeAll` (setup app + seed), `afterAll` (cleanup DB + close app)
- Test flow thực tế theo thứ tự: setup → action → assert response → assert DB state

### Bước 3 — Chạy thật và đọc output
```bash
npm run test:e2e
```
Đọc kết quả, identify chính xác test nào fail và tại sao.

### Bước 4 — Fix và lặp lại
- Nếu fail do spec sai: sửa spec
- Nếu fail do bug trong code: sửa code, báo cáo rõ file nào đã sửa
- Chạy lại cho đến khi tất cả pass

### Bước 5 — Báo cáo
- Tổng kết: số test pass/fail, endpoints đã cover
- Cập nhật `docs/TEST_PLAN.md` với kết quả ✅/❌

## Quy tắc
- Mỗi test case phải độc lập — không phụ thuộc thứ tự chạy
- Dùng `supertest` gọi HTTP thật vào NestJS app, không mock controller
- Assert cả HTTP status, response body shape, và DB state sau action
- Cleanup toàn bộ data đã tạo trong `afterAll` — không để "rác" trong test DB
- Không hardcode credentials — dùng biến hoặc tạo user trong `beforeAll`

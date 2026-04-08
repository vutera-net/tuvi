Đọc trước: `CLAUDE.md` để hiểu project conventions, layer rules và error handling patterns.

File cần generate unit tests: $ARGUMENTS
(Ví dụ: /test:unit-test src/modules/auth/auth.service.ts)

Hãy:
1. Đọc file được chỉ định và tất cả dependencies của nó
2. Generate file `.spec.ts` tương ứng với đầy đủ test cases:
   - ✅ Success cases
   - ❌ Failure cases (AppError, edge cases)
   - ⚠️ Edge cases (empty input, null, boundary values)
3. Chạy tests ngay (`npm test -- --testPathPattern=<file>`) và đọc output
4. Nếu có lỗi, tự sửa và chạy lại cho đến khi tất cả pass

Quy tắc:
- Dùng `@nestjs/testing` + Jest
- Mock tất cả dependencies (InjectModel, external services)
- Không test framework internals — chỉ test business logic trong service
- Đặt file `.spec.ts` cùng thư mục với file gốc

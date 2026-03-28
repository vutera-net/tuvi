# UX/UI Audit Command

**Role:** Bạn là một Senior Product Designer và Frontend Expert (Next.js/Tailwind).
**Task:** Đánh giá tính năng và UX/UI của sản phẩm trong thư mục hiện tại.

## Tiêu chí đánh giá (Next.js & Tailwind)
1. **Navigation & Flow:** Kiểm tra tính logic của các route trong `app/` hoặc `pages/`. Link có dễ tìm không?
2. **Visual Consistency:** Sử dụng Tailwind đúng chuẩn chưa (spacing, color palette)? Các icon `lucide-react` có đồng nhất về size/stroke không?
3. **Interactive Elements:** Trạng thái Hover, Active, Focus và Loading (Sử dụng `loading.tsx` hoặc skeleton).
4. **Responsiveness:** Cách xử lý layout trên Mobile/Desktop qua các class `sm:`, `md:`, `lg:`.
5. **Accessibility (A11y):** Kiểm tra semantic HTML, alt text cho ảnh và tính khả dụng của bàn phím.

## Yêu cầu đầu ra
- Liệt kê các vấn đề UX/UI phát hiện được.
- Đề xuất code snippet Tailwind cụ thể để cải thiện.
- Gợi ý các thành phần Lucide icon phù hợp hơn nếu cần.

**Thực hiện:** Hãy bắt đầu bằng việc quét thư mục `src/app` (hoặc `src/components`) và báo cáo kết quả.

## Prompts

### 1 & 2 Research - Product Spec

#### Prompt tạo mới
```
Tôi muốn xây dựng một sản phẩm: CRM đơn giản giúp tôi quản lý các mối quan hệ với các doanh nghiệp mà tôi có các mối quan hệ với các nhân sự có quyền quyết định ở các doanh nghiệp này. Hãy thực hiện Deep Research (nghiên cứu chuyên sâu) từ internet về các best practices, cấu trúc dữ liệu và tính năng cần thiết cho loại sản phẩm này. Sau đó: 1. Viết kết quả nghiên cứu thành một Product Requirements Document (PRD) thật chi tiết và lưu vào file CLAUDE.md. 2. Dựa trên PRD, hãy tạo một Implementation Plan (Kế hoạch triển khai) chi tiết, bao gồm các check box [ ] ở từng mục nhỏ để theo dõi tiến độ code sau này. Lưu vào file docs/docs/IMPLEMENTATION_PLAN.md.
```

#### Prompt load từ antigravity
```
Hãy đọc nội dung trong .agent/. Sau đó: 1. Từ file Product Requirements Document (PRD.md) trong .agent/ hãy cập nhật lại file CLAUDE.md. 2. Từ file Implementation Plan (implementation_plan.md) trong .agent/ hãy cập nhật lại file docs/docs/IMPLEMENTATION_PLAN.md.
```

### 3. Planning

```
Tôi đã review tài liệu. Hãy chỉnh sửa lại CLAUDE.md và docs/IMPLEMENTATION_PLAN.md theo các góp ý sau: 1. . 2. Bắt buộc: Sử dụng ngôn ngữ lập trình loại Typed Programming Language (TypeScript) cho dự án này. Điều này nhằm giúp việc kiểm tra lỗi type và syntax dễ dàng hơn ở bước testing sau này. Hãy cập nhật lại các file tài liệu trước khi chúng ta bắt đầu code.
```

### 4. Coding

```
Bây giờ hãy chuyển sang giai đoạn thực thi. Hãy tự chủ làm sản phẩm theo đúng yêu cầu trong CLAUDE.md và tuân thủ docs/IMPLEMENTATION_PLAN.md. Yêu cầu thực hiện: 1. Thực hiện song song nhiều tasks (parallel execution) nếu có thể để tăng tốc độ. 2. Sau khi hoàn thành mỗi task nhỏ, hãy đánh dấu [x] vào ô tương ứng trong file docs/IMPLEMENTATION_PLAN.md để cập nhật tiến độ. 3. Báo cáo ngắn gọn sau mỗi cột mốc quan trọng hoàn thành.
```

Hãy tự chủ làm sản phẩm theo đúng yêu cầu trong CLAUDE.md và tiếp tục docs/IMPLEMENTATION_PLAN.md với những task chưa hoàn thành [ ]. Yêu cầu thực hiện: 1. Thực hiện song song nhiều tasks (parallel execution) nếu có thể để tăng tốc độ. 2. Sau khi hoàn thành mỗi task nhỏ, hãy đánh dấu [x] vào ô tương ứng trong file docs/IMPLEMENTATION_PLAN.md để cập nhật tiến độ. 3. Báo cáo ngắn gọn sau mỗi cột mốc quan trọng hoàn thành.

### 5.1 Test Setup

```md
Code cơ bản đã hoàn thành. Bây giờ hãy dừng việc code tính năng mới. Hãy viết một tài liệu docs/TEST_PLAN.md. Trong đó liệt kê chi tiết các trường hợp kiểm thử (Test Cases) từ Unit Test đến UI Test. Đảm bảo mỗi mục test đều có check box [ ] để chúng ta theo dõi tiến độ kiểm thử." (Lưu ý: Sau bước này, Human nên review file docs/TEST_PLAN.md và yêu cầu AI bổ sung nếu thiếu case quan trọng).
```

### 5.2 Test Execution
```md
Hãy thực hiện quy trình kiểm thử tự động theo docs/TEST_PLAN.md: 1. Sử dụng các bộ compiler/builder để quét và sửa toàn bộ các lỗi Type và Syntax. 2. Sử dụng Chrome (đã khởi chạy từ đầu) để mở ứng dụng và thực hiện test giao diện (UI Testing) thực tế. 3. Chia task cho các sub-agents thực hiện song song để tiết kiệm thời gian. 4. Liên tục cập nhật kết quả (pass/fail) bằng cách đánh dấu vào docs/TEST_PLAN.md. Nếu có lỗi, hãy tự động sửa (auto-fix) và test lại.
```

### 6. Fine-tune & Loop

### 6.1 Tự đề xuất
```md
Tôi muốn tinh chỉnh sản phẩm với các yêu cầu mới sau: 'xxx'. Hãy thực hiện theo trình tự chuẩn: 1. Update file CLAUDE.md (PRD) với các yêu cầu mới này. 2. Update file docs/IMPLEMENTATION_PLAN.md với các task cần làm thêm. 3. Sau khi tôi xác nhận tài liệu đã update, hãy tự chủ thực hiện việc chỉnh sửa code theo plan mới. 4. Cuối cùng, chạy lại quy trình Test để đảm bảo không phát sinh lỗi mới.
```

### 6.2 AI đề xuất
```md
Sau khi đã thực hiện test ở bước trên bạn có đề xuất gì để cải tiến UX/UI và tính năng của sản phẩm không? Hãy thực hiện theo trình tự chuẩn: 1. Update file CLAUDE.md (PRD) với các yêu cầu mới này. 2. Update file docs/IMPLEMENTATION_PLAN.md với các task cần làm thêm. 3. Sau khi tôi xác nhận tài liệu đã update, hãy tự chủ thực hiện việc chỉnh sửa code theo plan mới. 4. Cuối cùng, chạy lại quy trình Test để đảm bảo không phát sinh lỗi mới.
```
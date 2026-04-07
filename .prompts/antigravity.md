

## 🚀 Process

### **1. Research (Nghiên cứu) & 2. Product Spec (PRD)**

**Prompt mẫu:**

```md
Tôi muốn tạo một [Tên sản phẩm/Mô tả ngắn gọn].

Ví dụ:
CRM đơn giản giúp tôi quản lý các mối quan hệ với doanh nghiệp và các nhân sự có quyền quyết định.

Yêu cầu:
- Nghiên cứu kỹ từ internet về ý tưởng và cách làm sản phẩm này
- Phân tích thị trường, đối thủ, best practices
- Đề xuất tính năng phù hợp

Sau đó:
- Viết Product Requirements Document (PRD) chi tiết để phục vụ việc phát triển sản phẩm
```

---

### **3. Planning (Lập kế hoạch & chỉnh sửa PRD)**

**Prompt mẫu:**

```md
Hãy xem lại phần [tên mục cần sửa, ví dụ: Tính năng quản lý user] trong PRD.

Tôi muốn bổ sung thêm yêu cầu:
[mô tả yêu cầu chi tiết]

Yêu cầu:
1. Cập nhật lại PRD
2. Cập nhật Implementation Plan tương ứng
```

---

### **4. Coding (Thực thi phát triển)**

**Prompt mẫu:**

```md
Implementation Plan và PRD đã ổn.

Hãy tự chủ thực hiện phát triển sản phẩm theo đúng Implementation Plan đã đề ra.
```

---

## 🧪 Testing Phase

### **5.1. Lập Test Plan (Request Review mode)**

**Prompt mẫu:**

```md
Dựa trên mã nguồn và các tính năng đã hoàn thiện:

Hãy viết tài liệu Test Plan chi tiết để kiểm tra toàn bộ ứng dụng.
```

👉 Sau đó:

* Review
* Comment
* Chỉnh sửa nếu cần

---

### **5.2. Thực thi Test tự động (Always Proceed mode)**

**Prompt mẫu:**

```md
Hãy tự chủ thực hiện Test Plan này để khởi chạy và kiểm thử tự động ứng dụng.

Yêu cầu:
- Sử dụng Browser SubAgent để thực hiện các thao tác kiểm thử
- Ghi lại kết quả test
- Báo cáo lỗi (nếu có)
```

---

## 🔄 Iteration / Improvement Phase

### **6.1. Cập nhật yêu cầu (Request Review mode)**

**Prompt mẫu:**

```md
Dựa trên kết quả test, tôi muốn chỉnh sửa các điểm sau:

[Liệt kê lỗi hoặc thay đổi]

Yêu cầu:
1. Update PRD với các yêu cầu mới
2. Update Implementation Plan tương ứng
```

👉 Sau đó:

* Review lại PRD + Plan

---

### **6.2. Thực thi sửa lỗi (Always Proceed mode)**

**Prompt mẫu:**

```md
Hãy tự chủ thực hiện việc chỉnh sửa sản phẩm (fine-tune)
theo PRD và Implementation Plan mới nhất.
```

---

## 📌 Ghi chú

* **Request Review mode** → dùng khi cần kiểm soát & duyệt
* **Always Proceed mode** → dùng khi muốn AI tự động thực thi
* Workflow này phù hợp với:

  * Solo builder
  * Indie hacker
  * AI-assisted development


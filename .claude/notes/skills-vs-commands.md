# Skills vs Commands trong Claude Code

> Tóm tắt hội thoại ngày 2026-04-07

---

## 1. Khái niệm Skills trong AI Agent

**Skills** = callable capabilities mà agent có thể thực thi: tools, functions, workflows, prompt templates.

Prompt trở thành skill khi có **tên định danh, interface rõ ràng, và có thể gọi chủ động theo tên**.

Ba tầng trong agent framework:
```
Tools   — thực thi hành động (gọi API, đọc file, chạy code)
Skills  — prompt/workflow có thể invoke theo tên (reusable)
Rules   — context luôn apply ngầm, không cần invoke
```

---

## 2. `.claude/commands/` = Skills

Files trong `.claude/commands/` **chính là skills** — cơ chế built-in, không cần flag:

```
.claude/commands/be/coding.md   →   /be:coding
.claude/commands/test/e2e.md    →   /test:e2e
```

---

## 3. Commands vs Skills — sự khác biệt

**Commands và Skills là cùng một thứ** — "skills" là tên khái niệm, "commands" là cách Claude Code implement.

Phân tầng:
- **Custom Commands** (`.claude/commands/`) — user-defined skills, markdown file
- **Built-in Skills** (`/commit`, `/simplify`...) — Anthropic định nghĩa sẵn, không thể tạo mới

---

## 4. `.claude/commands/` vs `.claude/skills/`

Skills là **evolution của Commands**, được merge thành một hệ thống:

| | `commands/` | `skills/` |
|--|-------------|-----------|
| Cấu trúc | Flat file `deploy.md` | Directory `deploy/SKILL.md` |
| Supporting files | Không | Có (templates, scripts, examples) |
| `context: fork` | Không | ~~Có~~ — không còn được support |
| Dynamic context injection | Không | Có — shell commands trong frontmatter |
| Invoke syntax | `/deploy` | `/deploy` (giống nhau) |
| Precedence khi trùng tên | Thấp hơn | **Wins** |

---

## 5. Khi nào dùng Skill thay vì Command?

Ba tình huống cần nâng lên Skill:

1. **Prompt quá dài** → tách supporting files vào subdirectory
2. **Cần dynamic context** → inject git info, env vars, timestamp lúc invoke
3. **Cần `context: fork`** → chạy isolated subagent, không làm nặng conversation chính

**Ngược lại**: Nếu chỉ là prompt text thuần, không cần fork, không có supporting files → dùng **command**.

---

## 6. Tự viết hay lấy từ nguồn chuẩn?

**Kết hợp cả hai theo từng loại:**

| Loại skill | Nên làm gì |
|-----------|------------|
| Generic (commit, review-pr) | Lấy từ official marketplace trước |
| Project-specific (test:e2e theo convention) | Tự viết |
| Team workflow (be:coding theo arch rules) | Tự viết + commit vào repo |

Skills trong project này (`be:coding`, `test:e2e`...) **phải tự viết** vì encode knowledge riêng: CLAUDE.md, layer rules, AppError, mongodb-memory-server convention...

---

## 7. Nguồn tham khảo Skills phổ biến

| Nguồn | Mô tả |
|-------|-------|
| [anthropics/skills](https://github.com/anthropics/skills) | Official Anthropic — chuẩn tham chiếu |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Curated list phổ biến nhất |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 220+ skills, cross-agent |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | Toolkit đầy đủ nhất |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 1000+ skills từ Anthropic, Vercel, Stripe... |

**Lưu ý thực tế**: Các nguồn trên hữu ích để lấy ý tưởng về structure và patterns, không phải copy nguyên.

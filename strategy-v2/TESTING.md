# Testing - Harmony Tử Vi

## Chạy tests

```bash
npm test              # Chạy tất cả tests một lần
npm run test:watch    # Watch mode (tự chạy lại khi file thay đổi)
npm run test:coverage # Coverage report
```

## Coverage hiện tại

| Module | File | Tests |
|--------|------|-------|
| Lunar Calendar Engine | `src/lib/engines/__tests__/lunar-engine.test.ts` | 20+ |
| Ngũ Hành Engine | `src/lib/engines/__tests__/ngu-hanh-engine.test.ts` | 15+ |
| Tử Vi Engine | `src/lib/engines/__tests__/tuvi-engine.test.ts` | 40+ |
| Pricing & Monetization | `src/lib/engines/__tests__/pricing.test.ts` | 45+ |
| **Tổng** | | **85+** |

## Chạy test cụ thể

```bash
# Theo file pattern
npm test -- lunar-engine
npm test -- ngu-hanh

# Theo tên test
npm test -- --testNamePattern="jdFromDate"

# Verbose output
npm test -- --verbose

# Single file
npm test -- src/lib/engines/__tests__/lunar-engine.test.ts
```

## Coverage report

```bash
npm run test:coverage
# HTML report: ./coverage/lcov-report/index.html
```

## Viết test mới

Đặt test file tại: `src/lib/engines/__tests__/{module-name}.test.ts`

```typescript
import { functionToTest } from '../module-name'

describe('Module Name', () => {
  describe('functionToTest', () => {
    it('should do something specific', () => {
      const result = functionToTest(input)
      expect(result).toEqual(expectedValue)
    })
  })
})
```

Import dùng path alias `@/`:
```typescript
import { solarToLunar } from '@/lib/engines/lunar-engine'
import type { LunarDate } from '@/types'
```

## Cấu hình

| File | Mục đích |
|------|----------|
| `jest.config.ts` | Jest config (jsdom env, `@/` alias, coverage) |
| `jest.setup.ts` | Mocks: next/navigation, next-auth, testing-library |

## Matchers hay dùng

```typescript
expect(value).toBe(exact)
expect(value).toEqual(deepEqual)
expect(number).toBeGreaterThan(5)
expect(number).toBeCloseTo(0.3, 2)
expect(array).toHaveLength(3)
expect(object).toHaveProperty('key')
expect(text).toContain('substring')
expect(() => fn()).toThrow('error message')
```

## TODO — Cần viết thêm

- [ ] `date-selection-engine.test.ts` — Tam Nương, Nguyệt Kỵ, Sát Chủ
- [ ] `bat-trach-engine.test.ts` — 8 cung mệnh
- [ ] `cuu-cung-engine.test.ts` — flying star pattern
- [ ] `horoscope-generator.test.ts` — daily scoring
- [ ] Integration tests (API routes)
- [ ] E2E tests (Playwright)

## Mục tiêu coverage

| Scope | Target |
|-------|--------|
| Engine modules | 90%+ |
| React components | 80%+ |
| API routes | 85%+ |
| Overall | 80%+ |

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| `Cannot find module '@/'` | Check `moduleNameMapper` trong `jest.config.ts` |
| `Cannot use import statement` | Đảm bảo dùng `nextJest` wrapper trong `jest.config.ts` |
| Next.js import errors | `jest.setup.ts` mock `next/navigation` và `next-auth` |
| Tests timeout | Thêm `jest.setTimeout(10000)` trong test file |
| Cache issues | `npm test -- --clearCache` |

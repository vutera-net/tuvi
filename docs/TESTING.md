# Testing Guide - Harmony Tử Vi

## Quick Start

```bash
npm test              # Run all tests once
npm test:watch        # Watch mode (reruns on file changes)
npm test:coverage     # Generate coverage report
```

## Current Test Coverage

| Module | File | Tests |
|--------|------|-------|
| Lunar Calendar Engine | `src/lib/engines/__tests__/lunar-engine.test.ts` | 40+ |
| Ngũ Hành Engine | `src/lib/engines/__tests__/ngu-hanh-engine.test.ts` | 40+ |
| Tử Vi Engine | `src/lib/engines/__tests__/tuvi-engine.test.ts` | 40+ |
| Pricing & Monetization | `src/lib/engines/__tests__/pricing.test.ts` | 45+ |
| **Total** | | **85+** |

## Configuration Files

| File | Purpose |
|------|---------|
| `jest.config.ts` | Main Jest config (jsdom env, `@/` alias, coverage) |
| `jest.setup.ts` | Mocks for Next.js router, next-auth, testing-library matchers |

## Run Specific Tests

```bash
# By file pattern
npm test -- lunar-engine
npm test -- ngu-hanh

# By test name
npm test -- --testNamePattern="jdFromDate"

# With verbose output
npm test -- --verbose

# Single file
npm test -- src/lib/engines/__tests__/lunar-engine.test.ts
```

## Coverage Report

```bash
npm test:coverage
# HTML report: ./coverage/lcov-report/index.html
```

## Writing New Tests

Place test files at: `src/lib/engines/__tests__/{module-name}.test.ts`

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

### Common Matchers

```typescript
expect(value).toBe(exact)                    // Strict equality
expect(value).toEqual(deepEqual)             // Deep equality
expect(number).toBeGreaterThan(5)
expect(number).toBeCloseTo(0.3, 2)
expect(array).toHaveLength(3)
expect(object).toHaveProperty('key')
expect(text).toContain('substring')
expect(() => fn()).toThrow('error message')
```

## Installed Dependencies

```
jest@30.3.0
@types/jest@30.0.0
ts-jest@29.4.6
jest-environment-jsdom@30.3.0
@testing-library/jest-dom@6.9.1
@testing-library/react@16.3.2
```

## Module Path Alias

Test files use `@/` alias mapping to `src/`:

```typescript
import { solarToLunar } from '@/lib/engines/lunar-engine'
import type { LunarDate } from '@/types'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module '@/'` | Check `moduleNameMapper` in `jest.config.ts` |
| `Cannot use import statement` | Ensure `nextJest` wrapper is used in `jest.config.ts` |
| Next.js import errors | `jest.setup.ts` mocks `next/navigation` and `next-auth` |
| Tests timeout | Add `jest.setTimeout(10000)` in test file |
| Clear cache | `npm test -- --clearCache` |

## Planned Test Modules (TODO)

- [ ] `date-selection-engine.test.ts` — Tam Nuong, Nguyet Ky, Sat Chu checks
- [ ] `bat-trach-engine.test.ts` — all 8 cung menh calculations
- [ ] `cuu-cung-engine.test.ts` — flying star pattern validation
- [ ] `horoscope-generator.test.ts` — daily horoscope scoring
- [ ] API route integration tests
- [ ] E2E tests with Playwright

## Coverage Goals

| Scope | Target |
|-------|--------|
| Engine modules | 90%+ |
| React components | 80%+ |
| API routes | 85%+ |
| Overall | 80%+ |

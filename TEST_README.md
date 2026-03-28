# Testing Guide - TuVi Ngay Moi

## Quick Start

### Install Testing Dependencies
All dependencies are already installed via `npm install`. If needed:
```bash
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react
```

### Run Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode (reruns on file changes)
npm test:watch

# Generate coverage report
npm test:coverage
```

## Project Test Structure

### Available Test Suites

#### 1. Lunar Calendar Engine (`src/lib/engines/__tests__/lunar-engine.test.ts`)
Tests for Vietnamese lunar calendar conversion using the Ho Ngoc Duc algorithm.

**Key Functions Tested:**
- `jdFromDate()` - Convert solar date to Julian Day Number
- `jdToDate()` - Convert Julian Day Number to solar date
- `solarToLunar()` - Convert solar calendar to lunar calendar
- `lunarToSolar()` - Convert lunar calendar to solar calendar
- `getDayInfo()` - Get complete daily information (Can-Chi, Hoang Dao, Hac Dao, etc.)
- `getTietKhi()` - Get solar terms (Tiết Khí)
- `hourToGioChi()` - Convert solar hour to zodiac hour (Gio Chi)

**Run Only Lunar Tests:**
```bash
npm test -- lunar-engine
```

#### 2. Five Elements Destiny Engine (`src/lib/engines/__tests__/ngu-hanh-engine.test.ts`)
Tests for Ngũ Hành (Five Elements) destiny determination and compatibility.

**Key Functions Tested:**
- `getNguHanhByYear()` - Get Ngũ Hành destiny for birth year
- `checkYearCompatibility()` - Check compatibility between two people
- `getNguHanhDescription()` - Get Vietnamese description of element
- `ageToYear()` - Convert age to birth year
- `getCanChiByYear()` - Get Can-Chi for a year

**Run Only Ngu Hanh Tests:**
```bash
npm test -- ngu-hanh-engine
```

## Test Commands

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage

# Run specific test file
npm test -- lunar-engine.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="jdFromDate"

# Run with verbose output
npm test -- --verbose

# Run with detailed error messages
npm test -- --no-coverage
```

### Advanced Usage

```bash
# Run only failed tests
npm test -- --onlyChanged

# Run with max workers (speed up execution)
npm test -- --maxWorkers=4

# Run with detailed timing
npm test -- --detectOpenHandles

# Generate HTML coverage report
npm test -- --coverage --coverageReporters=html

# Run a specific test by line number
npm test -- lunar-engine.test.ts:20
```

## Coverage Reports

### Generate Coverage
```bash
npm test:coverage
```

This generates:
- Console output showing coverage percentage
- Coverage directory with detailed HTML reports
- Text summary in coverage/lcov-report/index.html

### Coverage Thresholds
Current setup collects coverage from:
- `src/**/*.{ts,tsx}` - All source files
- Excludes:
  - `.d.ts` files (type definitions)
  - `.stories.tsx` files (Storybook)
  - `index.ts` files (barrel exports)

## Test Structure

### Test File Organization
Each test file follows this structure:

```typescript
// 1. Imports
import { functionToTest } from '../module'
import type { TypeName } from '@/types'

// 2. Test Suites (describe blocks)
describe('Module Name - Feature', () => {
  describe('Specific Function', () => {
    it('should do something', () => {
      // 3. Arrange (setup)
      const input = testValue

      // 4. Act (execute)
      const result = functionToTest(input)

      // 5. Assert (verify)
      expect(result).toBe(expectedValue)
    })
  })
})
```

### Example Test Pattern

```typescript
describe('jdFromDate', () => {
  it('should convert solar date to Julian Day Number correctly', () => {
    const jd = jdFromDate(1, 1, 2024)
    expect(typeof jd).toBe('number')
    expect(jd).toBeGreaterThan(2400000)
  })
})
```

## Writing New Tests

### Template for New Test File

Create files at: `src/lib/engines/__tests__/{module-name}.test.ts`

```typescript
/**
 * Module Name Tests
 * Description of what this module tests
 */

import { functionToTest } from '../module-name'
import type { TypeName } from '@/types'

describe('Module Name', () => {
  describe('FunctionName', () => {
    it('should do something specific', () => {
      // Test implementation
      const result = functionToTest(input)
      expect(result).toEqual(expectedValue)
    })
  })
})
```

### Common Jest Matchers

```typescript
// Equality
expect(value).toBe(expectedValue)              // Strict equality (===)
expect(value).toEqual(expectedValue)           // Deep equality
expect(value).not.toBe(otherValue)             // Not equal

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// Numbers
expect(number).toBeGreaterThan(3)
expect(number).toBeGreaterThanOrEqual(3.5)
expect(number).toBeLessThan(5)
expect(number).toBeLessThanOrEqual(4.1)
expect(number).toBeCloseTo(0.3, 5)             // Check within decimal places

// Strings
expect(string).toMatch(/regular expression/)
expect(string).toContain('substring')

// Arrays/Objects
expect(array).toHaveLength(3)
expect(array).toContain(element)
expect(object).toHaveProperty('propertyName')
expect(object).toEqual({ property: 'value' })

// Functions
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg1, arg2)
expect(fn).toHaveBeenCalledTimes(2)

// Errors
expect(() => throwingFunction()).toThrow()
expect(() => throwingFunction()).toThrow(Error)
expect(() => throwingFunction()).toThrow('error message')
```

## Configuration Files

### jest.config.ts
Located at project root. Configures:
- Test environment (jsdom for React testing)
- Module paths (@/ alias)
- Coverage settings
- Test file patterns

### jest.setup.ts
Located at project root. Sets up:
- Testing library matchers (@testing-library/jest-dom)
- Next.js mocks (router, navigation)
- Auth mocks (next-auth)
- Console error handling

### package.json
Contains test scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Debugging Tests

### Enable Debug Output
```bash
npm test -- --verbose
```

### Debug in Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome browser.

### Debug Specific Test
```bash
npm test -- --testNamePattern="specific test name" --verbose
```

### Skip Tests
Use `.skip` to skip a test:
```typescript
it.skip('should do something', () => {
  // This test will be skipped
})
```

Use `.only` to run only one test:
```typescript
it.only('should do something', () => {
  // Only this test will run
})
```

## CI/CD Integration

### GitHub Actions Example
Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
```

## Common Issues and Solutions

### Issue: "Cannot find module '@/'"
**Solution:** Ensure jest.config.ts has moduleNameMapper configured:
```typescript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Issue: "TypeError: Cannot use import statement outside a module"
**Solution:** Ensure jest.config.ts uses ts-jest preset through nextJest wrapper

### Issue: Tests timeout
**Solution:** Increase timeout in test file:
```typescript
jest.setTimeout(10000) // 10 seconds

it('should do something slow', () => {
  // test code
})
```

### Issue: "ReferenceError: document is not defined"
**Solution:** Ensure jest.config.ts has `testEnvironment: 'jsdom'`

### Issue: Next.js specific imports fail
**Solution:** jest.setup.ts includes mocks for:
- next/navigation (useRouter, usePathname, useSearchParams)
- next-auth (auth, useSession)

Add more mocks as needed.

## Future Test Development

### Planned Test Modules
- [ ] `tuvi-engine.test.ts` - Tu Vi Dau So calculations
- [ ] `date-selection-engine.test.ts` - Date selection logic
- [ ] `bat-trach-engine.test.ts` - Bat Trach Feng Shui
- [ ] `cuu-cung-engine.test.ts` - Cuu Cung Phi Tinh
- [ ] `horoscope-generator.test.ts` - Daily horoscope generation
- [ ] Component tests for `/src/components`
- [ ] API route tests for `/src/app/api`
- [ ] Integration tests for full workflows

### Coverage Goals
- Engine modules: 90%+ coverage
- Component library: 80%+ coverage
- API routes: 85%+ coverage
- Overall target: 80%+ project coverage

## Resources

- **Jest Documentation:** https://jestjs.io/
- **Testing Library:** https://testing-library.com/
- **Next.js Testing:** https://nextjs.org/docs/testing
- **TypeScript + Jest:** https://jestjs.io/docs/getting-started#using-typescript

## Contact & Support

For issues with the test setup, refer to:
1. Check jest.config.ts and jest.setup.ts
2. Verify all dependencies are installed: `npm install`
3. Clear cache: `npm test -- --clearCache`
4. Check Node version compatibility (Node 16+ recommended)

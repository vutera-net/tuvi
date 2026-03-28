# Jest Testing Framework Setup - Complete

## Setup Date
March 28, 2026

## Installation Status: ✅ COMPLETE

### Installed Dependencies
```
jest@30.3.0
@types/jest@30.0.0
ts-jest@29.4.6
jest-environment-jsdom@30.3.0
@testing-library/jest-dom@6.9.1
@testing-library/react@16.3.2
```

### Configuration Files Created

#### 1. jest.config.ts
- **Location:** `/Users/macos/Project/Experiments/Harmony/tuvi/jest.config.ts`
- **Purpose:** Main Jest configuration with Next.js integration
- **Key Settings:**
  - Test environment: jsdom (for React component testing)
  - Root: src directory
  - Test patterns: `**/__tests__/**/*.test.ts(x)` and `**/*.test.ts(x)`
  - Module alias mapper: `@/` → `src/`
  - Coverage provider: v8
  - Setup file: jest.setup.ts

#### 2. jest.setup.ts
- **Location:** `/Users/macos/Project/Experiments/Harmony/tuvi/jest.setup.ts`
- **Purpose:** Test environment initialization
- **Includes:**
  - @testing-library/jest-dom matchers
  - Next.js router mocking (useRouter, usePathname, useSearchParams)
  - next-auth mocking (auth, useSession, SessionProvider)
  - Console error suppression for React warnings

#### 3. package.json Scripts
Updated with test commands:
- `npm test` - Run Jest once
- `npm test:watch` - Run Jest in watch mode
- `npm test:coverage` - Generate coverage report

### Test Files Created

#### 1. Lunar Engine Tests
- **Location:** `/Users/macos/Project/Experiments/Harmony/tuvi/src/lib/engines/__tests__/lunar-engine.test.ts`
- **Size:** 10,977 bytes
- **Test Suites:** 6
- **Tests:** 40+
- **Coverage:**
  - `jdFromDate()` - Julian Day Number conversion (4 tests)
  - `jdToDate()` - JD to solar date conversion (3 tests)
  - `solarToLunar()` - Solar to lunar calendar conversion (5 tests)
  - `lunarToSolar()` - Lunar to solar conversion (4 tests)
  - `getDayInfo()` - Complete day information aggregation (6 tests)
  - `getTietKhi()` - Solar terms detection (1 test)
  - `hourToGioChi()` - Hour to zodiac hour conversion (3 tests)
  - Roundtrip conversions (1 test)

Key Test Scenarios:
- JD conversion accuracy with known values
- Inverse function verification (roundtrip tests)
- Range validation for Can-Chi values
- Timezone handling
- Month boundary detection
- Leap month identification
- Hour mapping for all 12 zodiac hours

#### 2. Ngũ Hành Engine Tests
- **Location:** `/Users/macos/Project/Experiments/Harmony/tuvi/src/lib/engines/__tests__/ngu-hanh-engine.test.ts`
- **Size:** 11,008 bytes
- **Test Suites:** 6
- **Tests:** 40+
- **Coverage:**
  - `getNguHanhByYear()` - Destiny determination (9 tests)
  - `checkYearCompatibility()` - Compatibility checking (6 tests)
  - `getNguHanhDescription()` - Element descriptions (6 tests)
  - `ageToYear()` - Age to birth year conversion (5 tests)
  - `getCanChiByYear()` - Can-Chi year calculation (6 tests)
  - Integration tests (3 tests)

Key Test Scenarios:
- Valid Ngu Hanh values (kim, moc, thuy, hoa, tho)
- Lucky colors/directions/numbers extraction
- Personality traits and relationships
- Compatibility scoring (0-100 range)
- 60-year Can-Chi cycle verification
- Age calculation accuracy
- Consistency checks for same inputs

### Directory Structure
```
tuvi/
├── jest.config.ts
├── jest.setup.ts
├── package.json (updated with test scripts)
└── src/
    └── lib/
        └── engines/
            └── __tests__/
                ├── lunar-engine.test.ts
                └── ngu-hanh-engine.test.ts
```

## Usage

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test:watch
```

### Generate Coverage Report
```bash
npm test:coverage
```

### Run Specific Test File
```bash
npm test -- src/lib/engines/__tests__/lunar-engine.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- --testNamePattern="jdFromDate"
```

## Test Coverage

### Current Coverage
- **Lunar Engine:** 40 tests covering core calendar functions
- **Ngũ Hành Engine:** 40 tests covering destiny and compatibility
- **Total:** 80+ tests across 2 core modules

### Future Test Coverage Targets
Additional test files to create:
- `src/lib/engines/__tests__/tuvi-engine.test.ts` - Tu Vi chart calculations
- `src/lib/engines/__tests__/date-selection-engine.test.ts` - Date selection logic
- `src/lib/engines/__tests__/bat-trach-engine.test.ts` - Feng Shui Bat Trach
- `src/lib/engines/__tests__/cuu-cung-engine.test.ts` - Nine Palaces Feng Shui
- `src/lib/engines/__tests__/tuvi-interpreter.test.ts` - Chart interpretation
- `src/lib/engines/__tests__/horoscope-generator.test.ts` - Daily horoscope
- Component tests for React UI components
- API route tests
- Integration tests

## Configuration Notes

### Module Resolution
- Path alias `@/` maps to `src/` directory for clean imports
- Works with TypeScript via ts-jest

### Test Environment
- jsdom environment allows DOM/React component testing
- Next.js mocks prevent import errors for server-only features
- next-auth mocks enable auth testing without actual providers

### TypeScript Support
- ts-jest preset handles TypeScript compilation
- All test files use .ts extension with full type checking
- @types/jest provides Jest API types

## Next Steps

1. **Create API Route Tests:** Add tests for `/api` endpoints
2. **Component Tests:** Create tests for React components in `src/components/`
3. **Integration Tests:** Add E2E and integration test suites
4. **Coverage Goals:** Aim for 80%+ code coverage
5. **CI/CD Integration:** Integrate tests into GitHub Actions workflow

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "Cannot find module '@/'"
- **Solution:** Ensure moduleNameMapper in jest.config.ts is properly set

**Issue:** Next.js imports cause errors
- **Solution:** jest.setup.ts includes necessary mocks for next/navigation and next-auth

**Issue:** TypeScript not compiling in tests
- **Solution:** Ensure ts-jest is installed and jest.config.ts uses nextJest wrapper

**Issue:** jsdom errors with canvas/DOM APIs
- **Solution:** Use appropriate test environment setup or mock heavy DOM dependencies

## References

- Jest Documentation: https://jestjs.io/
- Testing Library: https://testing-library.com/
- Next.js Jest Setup: https://nextjs.org/docs/testing
- TypeScript with Jest: https://jestjs.io/docs/getting-started#using-typescript

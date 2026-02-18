# Property-Based Testing with fast-check

This document describes how to integrate property-based fuzz testing into a Transmute modernization project.

## Overview

Property-based testing generates thousands of test cases automatically to find edge cases that manual testing misses. In Transmute, we use it to verify **parity** between legacy and modern implementations across a wide input domain.

## Integration Pattern

### 1. Install fast-check
```bash
npm install fast-check
```

### 2. Create Test File

```typescript
import fc from 'fast-check';
import { LegacyService } from '../original/legacy.ts';
import { ModernService } from '../target/modern.ts';

describe('Parity Fuzz Tests', () => {
  // Define your input domain
  const validInputs = fc.record({
    id: fc.string({ minLength: 1, maxLength: 20 }),
    amount: fc.integer({ min: 0, max: 100000 }),
    currency: fc.oneof(fc.constant('USD'), fc.constant('EUR'), fc.constant('GBP')),
  });

  it('should maintain parity for all valid inputs', () => {
    fc.assert(
      fc.property(validInputs, (input) => {
        const legacy = LegacyService.process(input);
        const modern = ModernService.process(input);
        return JSON.stringify(legacy) === JSON.stringify(modern);
      }),
      { numRuns: 1000 }
    );
  });
});
```

## Seeded Fuzzing

For reproducible runs, use a seed:

```typescript
fc.assert(
  fc.property(validInputs, (input) => { /* ... */ }),
  { seed: 12345, numRuns: 1000 }
);
```

## Domain-Specific Arbitraries

Create custom arbitraries for your legacy data types:

```typescript
// Example: ISO8583 Field 3 Processing Code (6 digits: TT-AA-BB)
const processingCodeArb = fc.tuple(
  fc.integer({ min: 0, max: 99 }),  // Transaction Type
  fc.integer({ min: 0, max: 99 }),   // From Account Type
  fc.integer({ min: 0, max: 99 })   // To Account Type
).map(([tt, aa, bb]) => 
  `${tt.toString().padStart(2, '0')}${aa.toString().padStart(2, '0')}${bb.toString().padStart(2, '0')}`
);
```

## Boundary Testing

Add explicit boundary cases:

```typescript
const boundaryCases = fc.record({
  input: fc.oneof(
    validInputs,
    fc.constant({ id: '', amount: 0, currency: 'USD' }),      // Empty/minimum
    fc.constant({ id: 'MAX', amount: 100000, currency: 'USD' }) // Maximum
  )
});
```

## Legacy State Management

For stateful legacy systems, reset state between runs:

```typescript
let globalState = {};

beforeEach(() => {
  globalState = resetLegacyState();
});

fc.assert(
  fc.property(validInputs, (input) => {
    resetLegacyState(); // Ensure clean state
    const legacy = LegacyService.process(input, globalState);
    const modern = ModernService.process(input);
    return legacy.output === modern.output;
  })
);
```

## CI Integration

Add to your pipeline:

```yaml
# .github/workflows/parity.yml
- name: Property Fuzz Tests
  run: |
    npm test -- --fuzz
    # Require 100% parity
    grep -q "1000/1000" test-output.log || exit 1
```

## References

- [fast-check docs](https://fast-check.dev/)
- See also: `references/decimal-numbers.md` for precision testing patterns

# Transmute SDK & Harness Components

This document describes all reusable components available in the Transmute skill.

---

## SDK (Stable Surface)

Entry point: `sdk/index.ts`

### Exports

| Class | Purpose |
|-------|---------|
| `BaseProber` | Execute legacy logic and capture outputs as Gold Standard |
| `BaseVerificationBridge` | Compare legacy vs modern outputs for parity |
| `ParityReporter` | Human-readable parity test reports |
| `ProbeResult` | Interface for captured probe data |

### Usage

```typescript
import { BaseProber, BaseVerificationBridge } from '../sdk/index';

// Extend for your legacy system
class MyProber extends BaseProber {
  executeLegacy(input: any): any {
    // Call your legacy binary/function
    return legacyBinary(input);
  }
}

// Capture gold standard
const prober = new MyProber();
const dataset = prober.probe(scenarios);
```

---

## Harness Components (Example Implementations)

Located in: `docs/harness/`

> ⚠️ **Note:** These are **example implementations** from our reference projects (oscar-iso8583, ca-gen-customer-service). They demonstrate the pattern but may require adaptation for your specific legacy system. Copy and modify as needed.

### BinaryProber.ts

Purpose: Execute C/COBOL binaries and capture exact binary outputs.

Use when: Legacy system is compiled binaries (not interpreted).

```typescript
import { probeIsoEngine } from './docs/harness/BinaryProber';

// Execute probe on ISO8583 C library
probeIsoEngine();
```

**Key features:**
- Compiles and executes C binaries
- Captures raw binary output (not just JSON)
- Generates Gold Standard dataset
- Supports version-specific probes (ISO8583-1987 vs 1993)

### AutoProber.ts

Purpose: Auto-discover legacy I/O patterns by executing with varied inputs.

Use when: No documentation exists, need to reverse-engineer behavior.

```typescript
import { LegacyProber } from './docs/harness/AutoProber';

const prober = new LegacyProber();
const dataset = prober.probe('legacy_bin.js', 'COMMAND', 10);

// Auto-generate contract
prober.deriveContract(dataset);
```

**Key features:**
- Iterative execution with pseudo-random inputs
- Derives JSON Schema from observed outputs
- Generates scaffolded verification bridge code
- Creates PROPERTIES.json from observed patterns

### VerificationBridge.ts

Purpose: Standard bridge pattern for parity testing.

```typescript
import { VerificationBridge } from './docs/harness/VerificationBridge';

const bridge = new VerificationBridge(modernService);
const result = await bridge.verifyParity(testInput);

if (!result.parity) {
  console.table([{ system: 'Legacy', ...result.legacy }]);
  console.table([{ system: 'Modern', ...result.modern }]);
}
```

**Key features:**
- Async support for modern services
- Detailed mismatch reporting
- Extensible for different input/output types

> ⚠️ **SDK Pattern:** The SDK (`sdk/`) is a starting point. For each modernization project, you may need to extend these classes or create a project-specific SDK. The skill references `../sdk/index.ts` - adjust the path for your project structure.

---

## Reference Documents

| Document | Purpose |
|----------|---------|
| `references/PROCESS.md` | General modernization workflow |
| `references/PROTOCOL.md` | TIP Protocol details |
| `references/PROPERTY_TESTING.md` | fast-check integration |
| `references/decimal-numbers.md` | Financial precision patterns |

---

## Integration Example

```typescript
// 1. Probe legacy to get gold standard
const prober = new LegacyProber();
const goldStandard = prober.probe('my_legacy.exe', 'process', 50);

// 2. Use bridge for ongoing parity checks
const bridge = new VerificationBridge(modernService);
const result = await bridge.verifyParity(goldStandard[0].input);

// 3. Report results
ParityReporter.report('Process Transaction', result.legacy, result.modern);
```

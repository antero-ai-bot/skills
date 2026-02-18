# Transmute SDK (stable surface)

Stable public entrypoint: `sdk/index.ts`

## Exports
- `BaseProber`
- `BaseVerificationBridge`
- `ParityReporter`
- `ProbeResult`

## Usage
```ts
import { BaseVerificationBridge } from '../sdk/index';

class Bridge extends BaseVerificationBridge {
  async callLegacy(input: any) { return input; }
  async callModern(input: any) { return input; }
}
```

## Compatibility contract
- New SDK classes/types should be exported through `sdk/index.ts`.
- `sdk/src/*` is internal implementation detail and may change.

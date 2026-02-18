# Reference Pair: CA Gen to TypeScript

## 🧩 Architectural Mapping
- **Action Block** -> `Service` Class Method
- **Action Diagram (PDL)** -> `async/await` Logic
- **Import View** -> `Request` DTO Interface
- **Export View** -> `Response` DTO Interface
- **Entity View** -> `Repository` Model / Entity
- **External/Common View** -> Shared Context / Global State Object

## 🛡️ Strategic Learnings (MANDATORY)
- **ID Strategy (ORD-YYYY-NNNN)**: Legacy CA Gen systems often use complex ID prefixes. Replicate this logic exactly in the modern repository to ensure parity in batch processing and list comparisons.
- **Repeating Groups**: CA Gen "Group Views" map to arrays of objects. Deep JSON equality is the standard for parity verification of batch operations.
- **Financial Precision**: CA Gen `NUMBER` types with scale must map to `Decimal.js`. Standard `number` types are strictly prohibited for logic containing currency or counts.
- **Async Verification**: All drivers in the Verification Bridge MUST be async to handle the asynchronous nature of modern TypeScript services and legacy binary stubs.
- **State Reset Isolation**: When testing nested or orchestrated block calls, the mock database must support a `reset()` method to ensure side effects from one test case don't pollute the next.
- **Deterministic ID Generation**: To avoid parity drift during high-volume testing, implement hash-based deterministic ID generation (using input view data) rather than `Math.random()`. This ensures stable, reproducible parity results across multiple runs.
- **Exploratory Fuzzing**: Use seed-based property generators to increase testing breadth without breaking the "Golden Baseline." Separate suites into fixed scenarios (CI) and exploratory fuzzing (discovery).

## 🔍 Verification Pattern
Always establish a **Verification Bridge** that calls the CA Gen generated binary (Ground Truth) and the modern service. 
- Use `console.table` for drift visualization.
- Use `node --experimental-strip-types` for direct TypeScript verification to speed up the TIP loop.

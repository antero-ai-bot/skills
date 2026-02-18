# Reference Pair: C to TypeScript

## 🧩 Architectural Mapping
- **Structs** -> `interface` or `class`
- **Pointers/Memory Allocation** -> Object references and garbage collection (automatic)
- **Functions** -> `export function` or class methods
- **Manual Bit Manipulation** -> `Uint8Array`, `Buffer`, and bitwise operators (`&`, `|`, `^`, `<<`, `>>`)
- **Error Handling (int returns)** -> `Error` throwing or `Result` pattern objects

## 🛡️ Strategic Learnings (MANDATORY)
- **Full API Equivalence**: Porting a library requires more than just the "packing" logic. You must implement the full lifecycle: `init`, `set`, `get`, `pack`, `unpack`, and `dump` (diagnostics).
- **Versioning Strategy**: If the legacy library supports multiple standards (e.g. ISO 1987 vs 1993), the modern implementation must handle this via a constructor parameter or factory, rather than hardcoding a single version.
- **Endianness and Alignment**: Legacy C code often relies on specific memory alignment or endianness. Modern TypeScript must use `DataView` or `Buffer` methods (`readUInt32BE`, etc.) to match this behavior exactly when processing binary data.
- **Side-Effect Orchestration**: C often uses global state or static variables. In TypeScript, encapsulate these in a `Service` class to ensure test isolation.
- **Resource Management**: Map manual `free()` and cleanup logic to modern lifecycle patterns (e.g., `dispose()` or standard GC).

## 🔍 Verification Pattern
Always use **External Legacy Execution** (Level 2/3 TIP).
- **Tooling**: Compile the original C code with `gcc` or `clang`.
- **Harness**: The `VerificationBridge` must execute the compiled binary via `child_process.execSync` and capture the stdout/stderr or resulting binary file.
- **Probing**: Since C allows for subtle undefined behavior, the **Legacy Prober** must use a wide range of boundary values (min/max integers, null pointers simulated via empty inputs) to find hidden logic branches.

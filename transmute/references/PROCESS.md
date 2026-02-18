# Transmute: Generalized Modernization Process

This document defines the standard agentic modernization workflow. It is designed to be applicable to any legacy-to-modern language pair.

## 1. Discovery (Comprehensive Artifact Analysis)
Do not trust static analysis alone. You must identify the "Ground Truth" of the system before proposing a modernization.
- **Full Surface Discovery**: Locate and read ALL definition files, headers, and auxiliary logic (e.g. `_defs_1987.c`, `_defs_1993.c`). Do not port a subset; aim for 100% API coverage.
- **Standard Identification**: Determine if the system supports multiple versions or standards. If so, use the **Strategy Pattern** in the target implementation to maintain this versatility.
- **Tooling Audit**: Check for `Makefiles` or build scripts. Your first step is to *compile* the legacy code to ensure you have a runnable ground truth.

## 2. Behavioral Contract (`PROPERTIES.json`)
Lock down the requirements as a machine-readable contract before any code is written.
- **Recipe**: Define a `PROPERTIES.json` in a `contracts/` directory.
- **Mandatory Fields**:
    - `math`: Specify library (e.g., `decimal.js`, `BigDecimal`) and rounding rules.
    - `id_strategies`: Define regex/padding rules for every entity.
    - `mapping`: Define data translations (e.g., `A` -> `Active`).

## 3. The Legacy Probe (Execution-First Evidence)
If a binary or environment exists, generate a dataset to serve as the "Gold Standard."
- **Action**: Execute the legacy logic against randomized or boundary-case inputs.
- **Goal**: Capture `(Input) -> (Output + State Result)` into a `GOLD_STANDARD.json`.
- **Validation**: Use this dataset to verify your understanding of rounding and truncation.

## 4. Functional Reconstruction (Implementation)
Modernize the logic into a clean, testable architecture.
- **Architecture**: 
    - **Repository Pattern**: Isolate all data access (whether file-based or SQL).
    - **Command/Strategy Pattern**: Isolate business logic from UI/Menu components.
- **Parity Hooks**: Every modern model MUST implement a `toLegacyFormat()` method if the legacy system depends on specific byte-level serialization (Level 2 Parity).

## 5. The Verification Bridge (Deep Parity Check)
Build a harness that proves the modern system is a verified clone.
- **Side-by-Side Test**: Feed identical inputs to the Legacy Ground Truth and the Modern Implementation.
- **Deep Assertion**: Compare raw state (file bytes or DB rows), not just function returns.
- **Feedback Loop**: Feed drifts back into the modernization agent for iteration until 100% parity is achieved.

## 6. Standard Documentation
Every project must provide:
- `README.md`: Clear instructions for Developers, Testers, and Architects.
- `EXAMPLES.md`: Documented verification targets (boundary cases).
- `MANUAL.md`: Steps for manual side-by-side verification in a terminal.

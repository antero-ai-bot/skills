# Transmute Integration Parity (TIP) Protocol

The TIP Protocol is a tiered verification standard used to ensure that a modernized system is a "behavioral twin" of the legacy system it replaces.

## Level 1: Logical Parity (Rule Match)
- **Goal**: The modern code implements the same business rules as the legacy source.
- **Verification**: Unit tests based on static analysis of the source code.
- **Risk**: High. Relies on human/AI interpretation of code which may contain hidden bugs or compiler-specific behaviors.

## Level 2: State Parity (Data Match)
- **Goal**: The modern system produces identical side effects as the legacy system.
- **Verification**: The Verification Bridge compares the resulting state (Bit-for-Bit file comparison or DB row comparison) after identical operations.
- **Requirement**: Use `toLegacyFormat()` to serialize modern objects into legacy-compatible bytes for comparison.

## Level 3: Property-Based Parity (Boundary Match)
- **Goal**: The systems behave identically across all possible input variations and edge cases.
- **Verification**: Property-based fuzzing (e.g., `fast-check` or `jqwik`).
- **Action**: Generate 1,000+ randomized scenarios. Compare the outputs of the Legacy binary vs the Modern service.
- **Drift Tolerance**: ZERO. Any difference in rounding, truncation, or sequence is a failure.

## Level 4: Release Readiness (Operational Integrity)
- **Goal**: The parity is stable, reproducible, and guarded by automated policy.
- **Verification**: Stability/Governance gating.
- **Action**:
    - **Deterministic Seeding**: Use fixed seeds for 100% reproducible suite runs.
    - **ID Determinism**: Use hash-based ID generation to eliminate "randomness" drift.
    - **Gated Release**: Enforce thresholds for aggregate parity (100%), max flake rate (0%), and minimum unit coverage (min 5 cases/unit).
    - **Machine Audit**: Generate SARIF and versioned JSON evidence for automated release approval.

## Implementation Standard
AI agents must elevate their verification level based on the risk profile of the logic:
- **Financial/Critical Logic**: Level 4 MANDATORY.
- **CRUD/Basic logic**: Level 3 MANDATORY.
- **UI/Display logic**: Level 1-2 ACCEPTABLE.

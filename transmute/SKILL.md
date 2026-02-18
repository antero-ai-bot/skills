---
name: transmute
description: Agentic Legacy Modernization. Strategically port legacy codebases to modern frameworks using functional reconstruction and the TIP Protocol.
metadata:
  version: "1.5"
  author: "antero-ai-bot"
---

# Transmute Skill: Phased Modernization Strategy

Transmute is a strategic framework for creating "verified clones" of legacy systems. As an agent, your perspective should be **Execution-First**: prioritize behavioral evidence over static interpretation.

## 🚀 Getting Started (Skill Delivery)
The Transmute skill includes a built-in CLI and project templates to initiate a new modernization repo correctly.

### 1. Project Initialization
To start transmuting a new repo, copy the templates to the project root:
```bash
cp /usr/local/lib/node_modules/openclaw/skills/transmute/templates/AGENTIC_WORKFLOW.md .
cp /usr/local/lib/node_modules/openclaw/skills/transmute/templates/AGENTS.md .
```
*(Note: Resolve the actual skill path based on your environment. Current: `/Users/antero/.openclaw/skills/transmute/`)*

### 2. Using the CLI
The `transmute` CLI provides health checks and visualization:
- **Status**: `node [SKILL_PATH]/bin/transmute.js status`
- **Dashboard**: `node [SKILL_PATH]/bin/transmute.js dashboard`

### 3. Mapping References
Consult the `references/` folder for specific language patterns:
- `references/ca-gen-to-typescript.md`
- `references/cobol-to-java.md`

## 🎯 Strategic Intent & Agentic Discretion
Your primary goal is to **prove behavioral parity**. The specific tactics you employ should adapt to the complexity of the legacy system and the target environment. The patterns described here are potential paths; choose the approach that best fits the problem at hand.

## 🗺️ Phased Modernization Strategy (The TIP Reference)
Successful modernization efforts typically follow these strategic layers of confidence. Adapt these steps to suit the risk and complexity of your specific module:

1.  **Behavioral Discovery & Environment Analysis**: (Critical) Uncover the true system behavior. Look beyond the local code to identify:
    *   **Shared Context Buffers**: Search for hidden global state, "Global Views," or shared memory regions that persist across calls.
    *   **Concurrency & Lifecycle Semantics**: Identify how the system behaves under load or within massive batch runs.
2.  **Behavioral Specification**: Formalize discoveries into a contract (e.g., `contracts/PROPERTIES.json`).
3.  **Functional Reconstruction (The Clone)**: Reconstruct logic block-by-block.
4.  **Parity Verification (The Bridge)**: Build a verification bridge that compares legacy execution against your modern clone.
5.  **Modernization Hardening (The Loop)**: (New) Implement automated gates and deterministic stability patterns to ensure the bridge is reliable and "ship-ready."
6.  **Operational Documentation**: Distill the process into artifacts that human operators can trust (README, EXAMPLES, MANUAL).

## 🛡️ Hardening Patterns & Best Practices
Proven techniques for taking a modernization project from "demo" to "production-grade":

### 1. Deterministic Integrity (No Flakes)
*   **Hash-Based IDs**: Never use `random()` in a parity harness. Generate IDs/Keys by hashing the input attributes. This ensures that the legacy and modern implementations produce identical results across re-runs.
*   **Seeded Fuzzing**: Use a persistent `seed` for all property-based tests. Separate your suite into **Baseline Scenarios** (fixed goldens) and **Exploratory Fuzzing** (high-volume randomized runs).

### 2. Release Governance Gates
Implement strict thresholds in your CI pipeline to block regressions:
*   **Parity Gate**: Exit non-zero if aggregate parity is below a target (e.g., 100%).
*   **Flake Gate**: Track flip-flops in test outcomes across runs. Block if the "flake rate" exceeds tolerance.
*   **Coverage Gate**: Enforce a minimum number of successful parity cases per legacy unit (e.g., min 5 cases for every action block).

### 3. Machine-Readable Evidence
*   **Versioned JSON Contracts**: Emit a structured `latest.json` with a versioned schema. This allows external dashboards and automated release managers to ingest parity data without custom parsing.
*   **SARIF Reports**: Output findings in SARIF format to integrate with standard static analysis and code scanning platforms (e.g., GitHub Advanced Security).

### 4. Progress Telemetry
*   **Task-Board Integration**: Link your `TASKS.md` or checklist directly to your status reporting. A "green" project requires both 100% parity *and* a completed checklist.

## 5. Project Organization
A standard portfolio structure helps maintain consistency, though tactical adjustments are encouraged:
- `contracts/` (Behavioral contracts and golden standards)
- `original/` (Legacy source artifacts and historical documentation)
- `target/` (The modernized implementation and its specific documentation)
- `harness/` (Verification tools: Probers, Bridges, and Fuzz tests)
- `bin/` (Scripts supporting the verification lifecycle)

## 6. Architectural Options for Scale
When a system exhibits high variability or complex protocols, consider a **Definition-Driven Architecture** over hardcoded logic:
*   **Encapsulated Logic**: Map legacy-specific types (e.g., `EBCDIC`, `BCD`, or mainframe precision decimals) to isolated, reusable strategy classes.
*   **Data-Driven Engines**: Design a generic target engine that consumes the `contracts/` definitions at runtime, allowing for rapid adjustment as new behaviors are discovered.
*   **Binary Integrity**: For computationally sensitive targets, using low-level buffer types (e.g., `Uint8Array`) as the primary data exchange format is often a more reliable path to bit-perfect parity.

## 📂 Reference Context (GENERAL)
Refer to these standard documents for potential implementation patterns:
- **Process Blueprint**: `references/PROCESS.md`
- **Verification Standards**: `references/PROTOCOL.md`
- **Property-Based Testing**: `references/PROPERTY_TESTING.md`

## 🛠 Reusable Components (SDK & Harness)
The skill includes reusable components for any language pair:

| Component | Location | Purpose |
|-----------|----------|---------|
| `BaseProber` | `sdk/` | Execute legacy, capture Gold Standard |
| `BaseVerificationBridge` | `sdk/` | Compare legacy vs modern |
| `BinaryProber` | `docs/harness/` | Execute C/COBOL binaries *(example)* |
| `AutoProber` | `docs/harness/` | Auto-discover legacy I/O *(example)* |
| `VerificationBridge` | `docs/harness/` | Standard parity testing *(example)* |
| **Full reference** | `docs/COMPONENTS.md` | All components with usage |

> ⚠️ **Note:** Components in `docs/harness/` are example implementations. Copy and adapt for your project.

See `docs/COMPONENTS.md` for detailed usage patterns.

## 🛠 Strategic Mapping Patterns (SPECIFIC)
Adapt these lessons learned to your current language/framework pair:
- **CA Gen to TypeScript**: `references/ca-gen-to-typescript.md`
- **COBOL to Java**: `references/cobol-to-java.md`
- **C to TypeScript**: `references/c-to-typescript.md`
- **Numerical Precision**: `references/decimal-numbers.md`

## ⚠️ CRITICAL: Commit & Push Protocol
**EVERY iteration MUST end with:**
```bash
git add -A && git commit -m "description of changes" && git push
```
Never leave uncommitted work behind. Code not pushed is code not shipped.

# Agentic Coding Guardrails Reference

> Extracted from industry best practices for LLM-assisted software engineering. These guardrails enable agents to iterate and self-correct without human babysitting.

## Overview

As agents move up the "ladder of abstraction" (from simple prompts → autonomous loops → multi-agent workflows), the rate of code generation increases 10x-100x. Without guardrails, agents will:
- Write insecure code
- Invent methods that don't exist
- Swap arguments silently (compiler happy, logic broken)
- Generate "slop tests" that don't survive refactoring

Guardrails are the steering mechanism — they let agents go fast *and* hit boundaries that force self-correction.

---

## Guardrails Table

| # | Guardrail | What It Enforces | Tooling Examples | Integration Point |
|---|-----------|------------------|------------------|-------------------|
| 1 | **Continuous Integration** | Branches live < 24h; merge to trunk daily; no large isolated batches | Git merge policies, branch protection rules | CI pipeline, pre-commit |
| 2 | **Static Typing + Type Leverage** | Compiler catches swapped args, wrong ID types; records over primitives | TypeScript, Rust, Java, `arcunit` | Build/compile step |
| 3 | **Deterministic Linting** | Code style enforced by tool, not prompt; run only on changed files | ESLint, Prettier, SonarLint, `golint` | Pre-commit, CI, agentic loop |
| 4 | **Token Budget Optimization** | Strip green test output; only emit failures to context | Custom wrapper scripts | Agent prompt engineering |
| 5 | **Shift-Left Feedback Loops** | Run lint/test/security scans *inside* agentic loop, not after PR | MCP-triggered hooks, sub-agent validators | Agent toolchain |
| 6 | **Architectural Constraint Tests** | Layer boundaries enforced automatically (e.g., Core → no DB) | arcunit, dependency-cruiser, ArchUnit | CI, pre-commit |
| 7 | **Scenario-Based Test Automation** | Tests focus on behavior, not 100% coverage; survive refactoring | BDD frameworks, hexagonal test ports | CI, agent validation |
| 8 | **Static Code Analysis (MCP)** | Security/reliability/maintainability scoring in agent loop | SonarCube MCP, CodeScene MCP | Agent toolchain |
| 9 | **Deterministic Hooks** | Guaranteed execution of guardrails regardless of agent will | Git hooks, tool-specific event hooks | CI, agent framework |

---

## Detailed Implementation Notes

### 1. Continuous Integration
- **Principle**: If code changes 10x-100x faster, merge 10x-100x more frequently.
- **Rule**: Feature branches ≤ 24h (ideally hours). Merge to `main`/`trunk` multiple times daily.
- **Implementation**: Branch protection rules, automated merge queues.

### 2. Static Typing + Type Leverage
- **Principle**: Compiler is a *free* guardrail. Use it.
- **Rule**: 
  - Use statically typed languages (TypeScript, Rust, Java, Go)
  - Prefer structured types (records, enums) over primitives (`string`, `int`)
  - Swap two record fields → doesn't compile → agent notices immediately
- **Implementation**: `tsc --strict`, `cargo check`, `mvn compile`.

### 3. Deterministic Linting
- **Principle**: Tool > Prompt. Don't ask LLM to follow style rules — enforce them.
- **Rule**:
  - Run lint *only on changed files* (diff-based for speed)
  - Use deterministic formatters (Prettier, rustfmt)
- **Implementation**:
  ```bash
  # Example: lint only staged JS/TS files
  git diff --staged --name-only | grep -E '\.(js|ts|tsx)$' | xargs eslint
  ```

### 4. Token Budget Optimization
- **Principle**: Green test logs pollute context → burn tokens → degrade agent reasoning.
- **Rule**: Strip all green output. Only emit:
  - Exit code
  - Failure messages + stack traces
- **Implementation**:
  ```bash
  # Custom test wrapper: only output on failure
  npm test 2>&1 | grep -E '(FAIL|ERROR|✗)' || echo "OK"
  ```

### 5. Shift-Left Feedback Loops
- **Principle**: Run guardrails *inside* the agentic loop, not after human review.
- **Rule**: Every agent iteration should run lint → test → security scan before returning.
- **Implementation**: Hook into agent framework's tool-execution events.

### 6. Architectural Constraint Tests
- **Principle**: Automate layer boundary enforcement. Don't generate diagrams to *check* — generate tests to *enforce*.
- **Rule**: Example — "Core domain must not import database layer"
- **Tooling**: ArchUnit (Java), dependency-cruiser (JS), arcunit (.NET)
- **Example**:
  ```java
  // ArchUnit example
  noClasses().that().resideInAPackage("..core..")
    .should().dependOnClassesThat().resideInAPackage("..database..");
  ```

### 7. Scenario-Based Test Automation
- **Principle**: Write few high-quality scenario tests, not 100% coverage slop.
- **Rule**:
  - Tests should survive refactoring (test behavior, not implementation)
  - Focus on distinct acceptance criteria, not per-method coverage
- **Implementation**: BDD-style tests, hexagonal architecture test ports.

### 8. Static Code Analysis (MCP)
- **Principle**: Agents get direct feedback on security, reliability, maintainability.
- **Tools**: SonarCube MCP, CodeScene MCP
- **Integration**: Agent calls MCP tool after code generation; receives score + flagged issues.

### 9. Deterministic Hooks
- **Principle**: Hooks fire 100% guaranteed — agent cannot "forget" or "ignore" them.
- **Types**:
  - Git hooks (pre-commit, pre-push)
  - Framework hooks (Cursor rules, Copilot hooks, OpenClaw hooks)
- **Implementation**:
  ```bash
  # .git/hooks/pre-commit
  npm run lint-staged && npm run test --silent && npm run security-scan
  ```

---


## Practical Caveats (High-Value Additions)

- **Do not lower quality bars as autonomy increases**: faster generation demands stricter enforcement, not relaxed standards.
- **Misalignment compounds in long autonomous runs**: add explicit intent-check checkpoints (acceptance criteria re-validation) before merge.
- **Static analysis scores are useful but imperfect**: treat Sonar/CodeScene as a guardrail signal, not truth; keep human readability and domain fit as final gate.
- **Prefer diff-scoped guardrails by default**: lint/test/scan changed files first for speed, escalate to full suite on merge or release.

---

## Key Principles Summary

| Principle | Implication |
|-----------|--------------|
| **Tool > Prompt** | Use deterministic tools for enforcement, not hopeful instructions |
| **Diff-Based** | Only lint/test changed files — scale with large codebases |
| **Token Efficiency** | Suppress green output; only surface failures |
| **Shift Left** | Run guardrails inside agentic loop, not post-PR |
| **Hooks = Guarantee** | Deterministic hooks fire regardless of agent intent |
| **Quality ≠ Coverage** | Few scenario tests > LLM-generated slop tests |

---

## Integration with Harness Engineering

These guardrails are **enforcement mechanisms** for the four core methodologies:

1. **Legibility** → Linting + Static Analysis ensure readable, consistent code
2. **Context Management** → Token optimization keeps context lean
3. **Architectural Invariants** → Dependency tests enforce layer boundaries
4. **Continuous GC** → CI + hooks catch regressions immediately

---

*Reference extracted from agentic coding best practices. Adapt to project-specific needs and compliance requirements.*

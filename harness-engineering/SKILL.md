---
name: harness-engineering
description: Design, audit, and improve agentic engineering harnesses that maximize correctness, quality, and autonomous throughput end-to-end. Use when asked to build or refine testing harnesses, CI/CD guardrails, acceptance-criteria workflows, autonomous coding loops, repository legibility standards, policy gates, or human-in-the-loop escalation for coding agents. Trigger on requests like "improve our agent workflow", "make agents more reliable", "add guardrails", "reduce regressions", "increase autonomous coding quality", or "design an agentic engineering system".
---

# Harness Engineering (Intent → Proof → Throughput)

Harness engineering is not “make agents code faster.”
It is: **make outcomes reliable while preserving autonomy**.

## Core Outcome Model

Optimize in this order:
1. **Intent fidelity** — agent solves the right problem.
2. **Proof of correctness** — behavior is verified, not claimed.
3. **Quality and safety** — architectural, security, and operational constraints hold.
4. **Autonomous throughput** — cycle time improves without increasing risk.

If autonomy rises while (1)-(3) regress, the harness is failing.

## Design Principles

### 1) Intent First, Tasks Second
- Encode user intent as explicit, testable acceptance criteria.
- Require agents to restate target outcomes before implementation.
- Add checkpoints that compare output against original intent before merge.

**Pattern:** `Intent spec -> Plan -> Implement -> Verify intent again`

### 2) Make Correctness Mechanical
- Prefer deterministic checks over prompt reminders.
- Run validation in-loop (compile, lint, tests, policy, security), not only at PR end.
- Fail loudly with actionable remediation hints.

### 3) Build Legibility as Infrastructure
- Keep architecture decisions, runbooks, and invariants in-repo.
- Use progressive disclosure (`AGENTS.md` map + focused references).
- Treat undocumented tribal knowledge as harness debt.

### 4) Enforce Boundary Invariants
- Prevent forbidden dependencies via architecture tests.
- Parse/normalize inputs at boundaries.
- Require typed contracts between layers and services.

### 5) Prefer Safe Sandboxes for Agent Runs
- Isolate runtime, data, and side effects.
- Route risky side effects to reversible sinks (e.g., outbox/log sinks) in preview mode.
- Make “unsafe mode” explicit and auditable.

### 6) Add Human Control at High-Impact Edges
- Humans define policy and approve exceptions.
- Agents execute the full loop under policy.
- Add HITL gates for destructive or external-impact actions.

## End-to-End Harness Loop

1. **Intake**: Capture intent, constraints, acceptance criteria.
2. **Environment prep**: Create reproducible, isolated runtime.
3. **Execution**: Agent implements against explicit criteria.
4. **Validation**: Run deterministic guardrails inside loop.
5. **Evidence**: Produce artifacts (test results, screenshots, logs, diffs).
6. **Review policy**: Auto-merge if all gates pass; escalate if confidence/risk threshold fails.
7. **Cleanup + learn**: Tear down resources and feed failures back into harness rules.

## Reliability Heuristics

- **Tight loop, short branch lifetime**: integrate frequently.
- **Diff-scoped fast checks first**; full suite at merge/release gates.
- **Token hygiene**: surface failures, suppress noisy green logs.
- **Retry by class**: transient infra failures retry; logic failures do not.
- **No guessed shapes**: enforce schemas and typed interfaces.

## Anti-Patterns

- Optimizing for code volume instead of verified outcomes.
- Treating CI as post-hoc QA instead of in-loop enforcement.
- Allowing agents to perform real external side effects in preview mode.
- Storing process-critical context in chat threads instead of repo artifacts.

## Practical Example Anchors (Generalized)

Use these as patterns, not prescriptions:
- **Ephemeral preview environments per task/PR** for isolated autonomous runs.
- **Identity-gated access** (e.g., IAP/Tailscale-like controls) to reduce exposure.
- **Sandbox side-effect controls** (e.g., outbox pattern) to prevent accidental external actions.
- **ChatOps-triggered workflows** to let non-engineers initiate bounded work.

See references for concrete examples and adaptation guidance.

## References

- [agentic-coding-guardrails](./references/agentic-coding-guardrails.md)
- [background-agent-patterns](./references/background-agent-patterns.md)

---
name: background-agent-implementation
description: Design and implement background coding-agent systems that run asynchronously from chat, issue trackers, or PR workflows. Use when setting up agent orchestration, isolated preview environments, secure access, sandboxed side effects, evidence collection, and human-in-the-loop approval paths.
---

# Background Agent Implementation

Build background-agent systems around **intent, safety, and evidence**, not around specific vendors.

## Outcome Contract

Every background-agent pipeline must guarantee:
1. **Correct target**: task intent is explicit and traceable.
2. **Safe execution**: environment/data/side effects are bounded.
3. **Verifiable result**: outputs include proof (tests/artifacts/screenshots/logs).
4. **Human control**: high-risk actions require explicit approval.

## Reference Architecture (Generic)

1. **Intake channel** (ChatOps, issue, form, API)
2. **Work item** (issue/PR/task object with labels and acceptance criteria)
3. **Orchestrator** (workflow runner + queue)
4. **Isolated runtime** (ephemeral VM/container/workspace per work item)
5. **Agent runtime** (session create → configure → prompt → monitor)
6. **Validation stack** (lint/tests/security/arch checks)
7. **Evidence publisher** (comment/thread with summary + artifacts)
8. **Approval gate** (auto-merge policy or human approval)
9. **Cleanup** (destroy runtime, expire data branches, archive logs)

## Implementation Protocol

### Phase 1 — Define Intent and Boundaries
- Normalize request into:
  - problem statement
  - acceptance criteria
  - constraints (security, compliance, runtime budget)
  - escalation policy
- Reject ambiguous tasks until criteria are testable.

### Phase 2 — Create Isolated Execution Context
- Use per-task runtime isolation.
- Provision environment from reproducible base images.
- Keep network exposure minimal and identity-gated.

### Phase 3 — Prepare Data and Side-Effect Controls
- Assign isolated DB branch/seed or deterministic fixture set.
- Set preview/sandbox mode for external integrations.
- Redirect notifications and outbound actions to audit outbox by default.

### Phase 4 — Start and Drive Agent Session
- Programmatically start session and inject scoped context.
- Include relevant thread history/work item discussion.
- Run iterative execution with in-loop validation, not post-hoc only.

### Phase 5 — Publish Evidence and Route Decision
- Post concise result summary:
  - what changed
  - what passed/failed
  - risk notes
  - links to artifacts (screenshots/logs)
- Apply merge/escalation policy based on risk and confidence thresholds.

### Phase 6 — Cleanup and Learn
- Tear down runtime and stale resources by TTL.
- Store failure signatures and update harness rules.
- Track throughput + quality metrics for continuous tuning.

## Security and Reliability Baselines

- No public-by-default worker exposure.
- Identity-based access control for preview and control surfaces.
- Separate transient infra retries from deterministic logic failures.
- Limit credentials to least privilege (prefer app installs over broad PATs).
- Log every high-impact action for auditability.

## Minimal Viable Rollout

Start with:
- one intake source (e.g., chat mention)
- one workflow path (task -> branch -> PR)
- one isolated runtime profile
- one evidence format (summary + screenshots + test output)
- one approval policy

Then scale only where bottlenecks prove it necessary.

## Practical Examples (Adaptable)

Common implementations include:
- Label-driven CI workflows that dispatch background agents.
- Ephemeral preview stacks with reverse proxy routing.
- Sandbox env flags that convert external side effects into outbox records.
- Automated feature-review runs that return visual proof for non-engineers.

For concrete pattern catalog, read:
- `../harness-engineering/references/background-agent-patterns.md`

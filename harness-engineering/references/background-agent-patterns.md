# Background Agent Patterns (Reference)

This reference distills practical patterns from a real-world article about background agents into portable, vendor-neutral guidance.

## Source Inspiration
- Ranger engineering write-up: *Why You're Overthinking Background Agents* (2026-02-20)
- Use source examples as implementation illustrations, not mandatory architecture.

## Pattern 1: Ephemeral Compute Per Work Item

**Intent**: isolate agent runs to prevent cross-task contamination.

**Example shape**:
- Create per-PR/per-task environment
- Keep it alive only while active
- Tear down automatically on completion/staleness

**Impact**:
- Better reproducibility
- Lower blast radius
- Easier debugging and cleanup

## Pattern 2: Reverse Proxy + Service Segmentation

**Intent**: provide predictable URLs and route boundaries for multi-service previews.

**Example shape**:
- Single ingress fronting API/UI/agent control plane
- Health endpoint required for readiness

**Impact**:
- Deterministic access surface
- Cleaner readiness orchestration

## Pattern 3: Identity-Gated Access by Default

**Intent**: avoid public exposure of preview systems.

**Example shape**:
- No public IP for worker hosts
- Org identity proxy/VPN-style access controls
- Role-based access for engineers vs non-engineers

**Impact**:
- Reduced attack surface
- Easier auditability

## Pattern 4: Branched or Isolated Data for Preview Runs

**Intent**: prevent agents from stepping on shared state.

**Example shape**:
- Database branch/fork per task with TTL cleanup
- Or deterministic seeds if branching unavailable

**Impact**:
- Parallel autonomous runs without collisions
- Realistic test behavior with controlled data

## Pattern 5: Side-Effect Sandbox

**Intent**: preserve realism without accidental external impact.

**Example shape**:
- `SANDBOX_ENV=true`
- Notification outbox sink instead of real Slack/email/postbacks
- Optional auto-enable for preview data sources

**Impact**:
- Safe autonomous operation
- Stronger confidence for non-engineer usage

## Pattern 6: Programmatic Agent Session Lifecycle

**Intent**: treat agent sessions as infrastructure primitives.

**Example shape**:
- API start/health/configure/prompt sequence
- Async kickoff from issue/PR context
- Attach conversation context for better intent resolution

**Impact**:
- Repeatable orchestration
- Lower operator toil

## Pattern 7: ChatOps as Universal Intake

**Intent**: reduce context-switching and broaden access.

**Example shape**:
- Mention bot -> create work item (PR/issue) -> apply workflow labels
- Thread context becomes part of agent prompt package

**Impact**:
- Non-engineers can request shipping work safely
- Standardized intake and audit trail

## Pattern 8: Evidence-Driven Completion

**Intent**: require proof, not just “done.”

**Example shape**:
- Automated feature review with screenshots and summary
- Link evidence into PR/chat thread

**Impact**:
- Faster stakeholder validation
- Better trust in autonomous delivery

## Pattern 9: Start Simple, Scale by Pain

**Intent**: avoid over-architecture at day 1.

**Example shape**:
- VM + compose + scripts first
- Use existing CI as queue
- Add complexity only when bottlenecks appear

**Impact**:
- Fast time to value
- Less operational drag

## Adoption Checklist

- [ ] Intent/acceptance criteria are explicit and machine-checkable
- [ ] Runtime is isolated and reproducible
- [ ] Access is identity-gated
- [ ] Data isolation strategy is defined
- [ ] Side effects are sandboxed in preview contexts
- [ ] Validation and evidence are produced automatically
- [ ] Human approvals exist for high-risk operations

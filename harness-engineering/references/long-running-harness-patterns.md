# Long-Running Harness Patterns (Planner / Generator / Evaluator)

> Distilled from Anthropic Engineering: *Harness design for long-running application development* (Mar 24, 2026).

## Why this reference exists

For long autonomous builds, two failure modes appear repeatedly:
- **Context degradation over time** (drift, premature wrap-up, loss of coherence)
- **Self-evaluation bias** (agents overrate their own output)

This reference adds practical patterns to mitigate both.

## Pattern 1: Separate roles by cognitive job

Use explicit agent personas:
- **Planner**: Expand short user prompt into ambitious but outcome-focused spec
- **Generator**: Implement one bounded slice at a time
- **Evaluator**: Independently test and grade; can block progress

Key rule: the generator should not be the final authority on quality.

## Pattern 2: Pre-implementation sprint contracts

Before coding each slice, require a brief contract between generator and evaluator:
- What will be built now
- What "done" means
- Which checks/evidence prove completion

This bridges high-level specs to testable implementation without over-prescribing internals.

## Pattern 3: Rubric-based evaluation (including subjective quality)

For work with taste/UX dimensions, turn subjective judgments into explicit criteria and thresholds.

Useful rubric dimensions:
- Product depth / completeness
- Functional correctness
- Design quality / coherence
- Code quality / maintainability

Calibrate evaluator scoring with examples and known failure cases. Weight criteria intentionally (not all dimensions matter equally).

## Pattern 4: Interaction QA over static review

Evaluator should actively exercise the running system (UI/API/state), not only inspect code or screenshots.

Practical checks:
- UI behavior via click/type/navigation flows
- API behavior and route correctness
- Data/state persistence and mutation validation

## Pattern 5: Context strategy is model-dependent

Use one of two continuity modes based on observed behavior:
- **Compaction**: same session, summarized history
- **Reset + structured handoff**: fresh session with explicit state artifact

If model shows long-run drift or premature completion, prefer reset + handoff. Re-evaluate per model release.

## Pattern 6: Evaluator cadence is dynamic

Evaluator overhead is justified when task difficulty is near/beyond model baseline reliability.

Guidance:
- Strong model + routine task: lighter evaluator cadence may be enough
- Frontier task / high risk: tighter evaluator loop and stricter gating

Treat evaluator usage as an economic trade-off, not dogma.

## Pattern 7: Harness simplification loop

Every harness component encodes an assumption about model weakness.

Maintain a recurring loop:
1. Remove one scaffold element
2. Re-run representative tasks
3. Measure quality delta
4. Keep only load-bearing complexity

As models improve, periodically prune scaffolding and redirect complexity budget to new bottlenecks.

## Operational checklist

- [ ] Planner converts short prompt to explicit spec
- [ ] Generator/evaluator agree sprint contract before coding
- [ ] Evaluator has independent pass/fail power
- [ ] QA exercises runtime behavior, not just static artifacts
- [ ] Context mode (compaction vs reset) chosen from empirical behavior
- [ ] Evaluator strictness calibrated from real misses
- [ ] Harness components re-validated after model upgrades

## Source

- Anthropic Engineering, *Harness design for long-running application development*:
  https://www.anthropic.com/engineering/harness-design-long-running-apps

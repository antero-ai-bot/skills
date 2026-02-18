# `transmute status --format json` Contract

This document defines the machine-readable output contract for:

```bash
node bin/transmute.js status --format json
```

## Versioning

- `statusPayloadVersion` is the CLI JSON contract version.
- Current version: `1.0.0`.
- Backward-incompatible changes MUST increment this version.

## Top-level fields

- `mode` (`"status"`)
- `statusPayloadVersion` (string semver)
- `generatedAt` (ISO timestamp)
- `strategy` (TIP strategy label)
- `strictMode` (boolean)
- `minUnitCoverage` (number or `null`)
- `hotspotLimit` (number)
- `trendLimit` (number)
- `gateParityPercent` (number or `null`)
- `gateParitySource` (`"flag" | "env:<NAME>" | null`)
- `gateParityPassed` (boolean or `null`)
- `maxFlakeRatePercent` (number or `null`)
- `flakeGateSource` (`"flag" | "env:<NAME>" | null`)
- `flakeGatePassed` (boolean or `null`)
- `behavioralContractLoaded` (boolean)
- `goldStandardGenerated` (boolean)
- `evidenceState` (`ok | none-found | not-found | all-invalid | unknown`)
- `aggregate` (object or `null`)
- `invalidArtifacts` (array)
- `unitsBelowCoverage` (array)
- `hotspots` (array)
- `trend` (array, capped by `trendLimit`)
- `flake` (object)
- `tasks` (object checklist summary)
- `markdownSummary` (string or `null`)

## Tasks object

`tasks` captures checkbox checklist progress from `--tasks-file` (default `TASKS.md`).
Supported checklist styles include unordered (`-`, `*`, `+`) and ordered (`1.`, `1)`) markdown list checkboxes:

- `file`
- `found`
- `pendingLimit` (resolved preview cap from `--tasks-limit`)
- `total`
- `completed`
- `open`
- `completionRate`
- `pending` (preview list capped by `--tasks-limit`)
- `pendingHidden` (number of open items omitted from preview)
- `pendingTruncated` (boolean indicating whether preview was truncated)

## Aggregate object

When `evidenceState === "ok"`, `aggregate` contains:

- `artifactsAnalyzed`
- `cases`
- `parityMatches`
- `driftCases`
- `parityRate`
- `parityPercent`
- `artifactPaths`
- `coverageByLegacyUnit`

## Strict mode behavior

`--strict` keeps existing non-zero exit semantics for drift/invalid/unknown evidence and coverage-gate violations. JSON mode does not relax strict gating.

## Parity gate behavior

When `--gate-parity <percentage>` or `--gate-parity-env <ENV>` is provided (mutually exclusive flags):

- `gateParityPercent` is populated with the resolved threshold.
- `gateParitySource` records whether threshold came from `flag` or `env:<NAME>`.
- `gateParityPassed` is `true`/`false` when parity can be evaluated, otherwise `false` when evidence is unknown.
- CLI exits non-zero if `gateParityPassed === false`, regardless of `--strict`.

## Trend behavior

- `--trend-limit <n>` controls how many latest trend points are emitted in both markdown and JSON payload.
- Default is `10`.
- `0` disables trend rows (empty `trend` array and no trend table in markdown summary).

## Flake gate behavior

When `--max-flake-rate <percentage>` or `--max-flake-rate-env <ENV>` is provided (mutually exclusive flags):

- `maxFlakeRatePercent` is populated with the resolved threshold.
- `flakeGateSource` records whether threshold came from `flag` or `env:<NAME>`.
- `flakeGatePassed` is `true` when observed flake rate is less than or equal to threshold.
- `flakeGatePassed` is `false` (fail-closed) when evidence is unknown.
- CLI exits non-zero if `flakeGatePassed === false`, regardless of `--strict`.

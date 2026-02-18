# AGENTIC_WORKFLOW.md

## Overview
This document defines the generic agentic workflow for project progression. It ensures consistency, legibility, and mechanical taste in every coding iteration.

## Workflow Phases

### 1. Analysis & Planning
Before any code changes, the agent must:
- **Discover:** Read relevant codebase sections to understand current state and constraints.
- **Research:** Identify dependencies, patterns, and potential edge cases.
- **Plan:** Define a specific, atomic iteration goal.
- **Record:** Store the iteration plan in `docs/iterations/YYYY-MM-DD-HHmm.md`.

### 2. Implementation
- **Code:** Implement the planned changes with high attention to detail and project standards.
- **Format:** Ensure code follows project style and conventions.
- **Invariants:** Maintain system invariants and architectural integrity.

### 3. Verification
- **Tests:** Add or update unit/integration tests to cover new functionality and prevent regressions.
- **Run:** Execute the test suite and verify all tests pass.
- **Review:** Perform a self-review of changes against the iteration plan.

### 4. Documentation
- **Update:** Modify relevant documentation (README, API docs, specifications) to reflect changes.
- **Log:** Update the project's progress tracker (e.g., `PROGRESS.md` or `HEARTBEAT.md` section).

### 5. Progression & Persistence
- **Commit:** Create a descriptive commit message following conventional commits.
- **Push:** Push changes to the remote repository.
- **Report:** Summarize the completed work and any new insights in the main session.

## Iteration Planning Template
Iteration plans stored in `docs/iterations/` should follow this structure:
- **ID:** YYYY-MM-DD-HHmm
- **Goal:** Clear description of the objective.
- **Context:** Brief summary of the current state and why this task is next.
- **Steps:** Bulleted list of discovery, implementation, and verification steps.
- **Expected Outcome:** How we know the iteration is successful.

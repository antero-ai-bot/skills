---
name: harness-engineering
description: Leverage LLM agents in an agent-first world by designing environments, specifying intent, and building feedback loops. Use this when building testing harnesses, optimizing CI/CD, improving repo legibility, or establishing autonomous development workflows.
metadata:
  version: "1.1"
  author: "Antero"
---

# Harness Engineering Skill: The Agent-First Workflow

Harness Engineering is the practice of shifting from "writing code" to "designing environments" where AI agents can execute with high reliability and velocity. Your primary job is to enable the feedback loops that allow agents to reason, validate, and recover autonomously.

## 🎯 Strategic Intent
Build what is necessary to increase engineering velocity by orders of magnitude. Humans steer; agents execute. 

**The Prime Directive**: When a task fails or feels "guess-heavy," the fix is rarely "try harder"—it is to **improve the environment's legibility or enforcement.** If the repo is illegible to you, your first task is to fix the repo so it becomes legible.

## 🗺️ Core Methodologies

### 1. Legibility as First-Class Requirement
Agents cannot work on what they cannot see or reason over.
- **Repository as System of Record**: Knowledge in Slack, Google Docs, or heads does not exist to an agent. Every decision, architectural pattern, and principle must be co-located in the repo as versioned Markdown or Schema.
- **Bootable Contexts**: Ensure the app is bootable per-task (e.g., git worktree). Agents should be able to launch, drive, and snapshot the UI or logs for any specific change.
- **Exposed Observability**: Make logs, metrics, and traces directly queryable by the agent. Prompts like "ensure startup is under 800ms" should be mechanically verifiable by the agent itself.

### 2. Context Management (Map, not Encyclopedia)
Avoid monolithic instruction manuals that rot and overwhelm.
- **Progressive Disclosure**: Treat `AGENTS.md` as a Table of Contents. Provide a map, not a 1,000-page manual.
- **Gardening Agents**: Use recurring background tasks to scan for stale documentation and open PRs to align docs with reality.
- **Executable Plans**: Treat plans as first-class artifacts. Version them, track progress, and co-locate decisions with code.

### 3. Rigid Architectural Invariants
Predictable structure allows agents to move fast without decay.
- **Layered Dependency Enforcement**: Strictly validate dependency directions (e.g., Types → Config → Repo → Service). Disallow cross-cutting concerns except through explicit Providers.
- **Parse at the Boundary**: Require data shapes to be parsed (not just validated) at every system boundary.
- **Mechanical Taste (Auto-Fixers)**: Use custom linters to enforce naming conventions, structured logging, and file limits. Prefer linters that provide auto-fix logic or inject remediation instructions directly into error messages.

### 4. Continuous Garbage Collection
Technical debt is a high-interest loan; pay it down daily.
- **Golden Principles**: Encode opinionated rules (e.g., "prefer shared utilities over helpers") and run background agents to refactor deviations automatically.
- **No YOLO Probing**: Do not allow agents to build on guessed shapes. Use typed SDKs or boundary validation strictly.

## 🏗️ The Autonomous Validation Loop
To drive a task to completion, an agent should:
1. **Implement**: Write the code/tests based on intent.
2. **Review**: Run local and cloud agent-to-agent reviews.
3. **Validate**: Drive the application (via browser skills or logs).
4. **Refine**: Respond to feedback and build failures autonomously.
5. **Merge**: Self-merge once all mechanical and taste invariants are satisfied.

## 🛠 Tooling Best Practices
- **Standard Tooling**: Use standard CLI tools (`gh`, `npm`, `git`) directly.
- **Boring Technology**: Favor stable, well-documented abstractions that are well-represented in training sets.
- **Repository-Embedded Skills**: Bundle specific task-handling logic (e.g., UI snapshots, log parsers) into the repo so any agent can use them.

---

*This skill is a living framework. Adapt its principles to the unique needs, compliance, and constraints of your specific project.*

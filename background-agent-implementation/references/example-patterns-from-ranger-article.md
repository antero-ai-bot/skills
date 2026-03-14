# Example Patterns from Ranger Background-Agent Article

Use this file for concrete examples when designing your own implementation. These examples are not mandatory architecture.

## Example Signals

- Slack mention triggers background-agent workflow.
- Draft PR body is used as the initial task payload.
- Workflow labels trigger preview/runtime provisioning.
- Ephemeral compute hosts run compose stack and agent UI.
- Identity-gated access controls preview URLs.
- Per-PR data branch prevents state collisions.
- `SANDBOX_ENV` routes external side effects to outbox logs.
- Agent performs implementation and then feature review with screenshots.
- Human stakeholders approve with evidence before merge.

## Translating to Other Stacks

- Slack -> Teams/Discord/email-to-ticket
- GCP IAP -> Tailscale/Zero-trust proxy/VPN
- Neon branching -> any DB branching or deterministic seed strategy
- OpenCode UI -> any API-controlled coding agent runtime

## Architectural Lesson

The winning pattern is not a specific cloud product. It is:

`intake -> isolated execution -> in-loop validation -> evidence -> governed merge`

When this loop is stable, model/vendor swaps are implementation details.

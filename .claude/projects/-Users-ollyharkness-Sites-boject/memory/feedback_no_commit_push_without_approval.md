---
name: No commit or push without approval
description: Never commit or push to main without explicit user approval first
type: feedback
---

Never commit or push to main without the user explicitly accepting it first.

**Why:** User wants to review changes before they hit the repo. Committing and pushing without approval is too proactive.

**How to apply:** After making changes, describe what was changed and ask the user to confirm before running `git commit` or `git push`. Never chain commit+push in a single command without approval for each step.

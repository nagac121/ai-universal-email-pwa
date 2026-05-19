# Development Workflow

## Multi‑Agent Claude Code CLI Process
1. **Specification & Specs‑Driven Design**
   - Write a concise `CLAUDE.md` spec describing the feature, UI, and AI behavior.
   - Define required agents, hooks, and skills (e.g., `context7‑mcp`, `simplify`, `security‑review`).
2. **Agent OS & Planning**
   - Run `claude code` to enter plan mode (`EnterPlanMode`).
   - The assistant creates a task list, drafts an implementation plan, and seeks approval.
3. **Implementation**
   - Use the generated plan to edit files, add Zustand stores, and integrate AI services.
   - Leverage `next-pwa` for PWA support and `PwaRegistry` for service‑worker registration.
4. **Automated Testing**
   - Run `npm test` (Jest) and verify UI via `npm run dev`.
   - Ensure AI priority badges and smart‑reply flow work across accounts.
5. **Review & Merge**
   - Run `claude code review` for a security & code quality review.
   - Create a PR, add a concise description, and merge.

## Key Tools & Plugins Used
- **Zustand** – central state for accounts, emails, and AI.
- **next‑pwa** – generates a service worker and registers the manifest.
- **Claude Code CLI** – orchestrates multi‑agent execution, plan mode, and hooks.
- **Hooks** – `PwaRegistry` registers the SW, `update-config` updates settings.
- **Skills** – `context7‑mcp` for library documentation, `security‑review` for final checks.

---
*This workflow is used for all future feature development and maintenance.*
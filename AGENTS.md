<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---
## Project Agents, Hooks, and Skills

### Custom Hooks
- **`PwaRegistry`** – Registers the service worker for the PWA (`src/components/pwa-registry.tsx`).
- **`useEmailStore`** – Zustand store handling accounts, emails, and unified inbox aggregation.
- **`useAIStore`** – Zustand store handling AI priorities, summaries, and smart replies.

### AI Plugins / Integrations
- **`next-pwa`** – Enables PWA capabilities (service worker, manifest). Configured in `next.config.ts`.
- **`context7‑mcp`** – Fetches up‑to‑date library documentation for AI features (e.g., smart replies, priority scoring).

### Specialized Agent Skills Used
- **`context7-mcp`** – Provides documentation lookup during development.
- **`simplify`** – Runs code‑quality checks and suggestions.
- **`security‑review`** – Performs a security audit of changes before merging.

These agents and hooks constitute the core workflow for building, testing, and deploying the AI‑first universal email PWA.


# Architecture Overview

## Modular Layout
- **`src/app/`**: Next.js App Router pages (`/inbox`, `/search`, `/compose`, etc.).
- **`src/components/`**: UI components broken down by domain (`email/`, `layout/`).
- **`src/lib/`**: Core logic, TypeScript types, and services.

## State Management (Zustand)
- **`email-store.ts`** – Handles accounts, active account selection, email fetching, and unified‑inbox aggregation. Implements mock email service calls and sorts aggregated emails chronologically.
- **`ai-store.ts`** – Manages AI priorities, summaries, and smart‑reply suggestions.

## Data Layer
- **`services/`** – `EmailService` and `AccountService` abstract external APIs (Gmail, Outlook, IMAP). In mock mode they return static data; real implementations can replace the provider.
- **`types/`** – Strongly‑typed interfaces (`EmailMessage`, `EmailAccount`, `Provider`, etc.) used throughout the app.

## UI Flow
1. **RootLayout** registers the PWA service worker via `PwaRegistry`.
2. **AccountSwitcher** selects an account or the unified inbox.
3. **InboxPage** loads accounts, fetches emails, and triggers AI priority retrieval.
4. **EmailList** displays emails with a compound key to avoid React warnings.
5. **EmailCard** renders each email row, showing AI priority badges and summaries.
6. **EmailDetail** provides full view with AI smart‑reply generation.

## PWA Integration
- `next-pwa` plugin in `next.config.ts` registers a service worker (`public/sw.js`).
- Manifest (`public/manifest.json`) is linked via `metadata.manifest` in `layout.tsx`.
- `PwaRegistry` component registers the service worker on the client.

---
*This document is used for future onboarding and design reviews.*
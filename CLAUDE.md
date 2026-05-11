# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Payorbit is a React web app rendered inside a **Flutter WebView**. Treat the runtime as a mobile WebView first (mobile
viewport, network reachable from device — see `docs/run-build.md` for `10.0.2.2` / LAN host quirks), not a desktop
browser.

## Required Reading Before Implementation

`AGENTS.md` mandates reading `harness/master.md` (Korean) before any work, and the matching `harness/features/*` file
for feature tasks (e.g. `harness/features/auth/V1-login-signup.md`). The harness is the source of truth for architecture
rules and "drift prevention". Key points it enforces:

- No new libraries without an explicit request.
- No `any`, no unsafe type assertions, no inline style / CSS modules / Tailwind.
- API calls live in hooks/query layers only — never in components.
- Reuse existing patterns; do not refactor file structure or rename to suit a new feature.

Installed stack: React + TypeScript, TanStack Router, TanStack Query, Zustand, styled-components. Framer Motion is
listed in the harness but **not installed** — don't add it until a feature actually needs it and the user approves.

## Commands

```bash
npm install          # install deps (npm — package-lock.json is the lockfile)
npm run dev          # vite dev server at http://localhost:5173
npm run dev:host     # vite --host 0.0.0.0 (use for Android emulator / real-device WebView)
npm run build        # tsc -b && vite build → dist/
npm run preview      # vite preview (defaults to http://localhost:4173)
```

There is **no lint script and no test runner configured**. `npm run build` is the only typecheck — it runs `tsc -b`
before bundling, so a clean build is the contract for "type-safe". Don't claim "tests pass" — there are none.

## Architecture

### Entry & providers

`src/main.tsx` → `AppProviders` (`QueryClientProvider` + styled-components `ThemeProvider` + `GlobalStyle` +
`ToastViewport`) → `RouterProvider`. `queryClient` is configured once in `src/app/queryClient.ts` with
`refetchOnWindowFocus: false` and `retry: 1`.

### Routing — code-based, not file-based

Despite what `harness/master.md` says about "file-based routing", routes are wired **manually** in `src/app/router.tsx`
using `createRootRoute` / `createRoute` + `addChildren`. To add a route:

1. Create `src/routes/<area>/<name>.route.tsx` exporting a `createRoute({ getParentRoute, path, component })`.
2. Import it in `src/app/router.tsx` and attach it via the existing `addChildren` chain.

Routes only wire URL → component (and `beforeLoad` guards); the component itself lives under
`src/features/<area>/pages/`. The `/` index route reads `useAuthStore` and redirects to `/home` or `/auth/login`.
Protected routes (e.g. `/home`) guard via `beforeLoad` + `useAuthStore.getState().isAuthenticated` — copy that pattern
when you add more protected pages.

### Feature folder shape

Each feature under `src/features/<area>/` follows this layout when applicable:

```
features/<area>/
  api/           # fetch functions that wrap apiRequest
  hooks/         # useQuery / useMutation hooks (the only place components touch API)
  stores/        # zustand stores (with localStorage persistence when needed)
  validation/    # pure form validators returning FieldErrors<T>
  components/    # reusable feature UI
  pages/         # route-level components
```

`auth` is the reference implementation — match its shape. Components must not call `apiRequest` directly; they
consume mutation/query hooks instead.

### Shared infrastructure

- `src/shared/api/apiClient.ts` — `apiRequest<T>(path, options)` is the single fetch wrapper. It reads
  `VITE_API_BASE_URL`, sets JSON headers, attaches a Bearer token when passed, and throws `ApiError` (status + code +
  message) on non-2xx. `getApiErrorMessage(error, fallback)` is the helper for user-facing messages. To extend with a
  refresh-token interceptor later, modify this single function — do not bypass it.
- `src/shared/toast/toastStore.ts` — zustand toast store. Components show toasts via `useToast()` (`success`, `error`).
  `ToastViewport` mounts once inside `AppProviders` and auto-dismisses after 3s.

### Auth flow

`useAuthStore` (`src/features/auth/stores/authStore.ts`) holds `{ accessToken, refreshToken, user, isAuthenticated }`
and persists the whole session to `localStorage` under the key `payorbit.auth`. The store is hydrated synchronously at
module load — `isAuthenticated` is correct on first render, so route guards in `beforeLoad` work without a loading
state.

Mutations live in `features/auth/hooks/` (`useLoginMutation`, `useSignupMutation`). On login success the mutation
calls `setSession`; the page is responsible for navigation. On signup success the page fires a toast and navigates to
`/auth/login`. **All API calls go through these hooks** — never `fetch`/`apiRequest` from a component.

### Styling

- **Only** `styled-components`. Theme tokens come from `src/app/theme.ts` (colors / spacing / radii / typography) and
  are typed for `DefaultTheme` via `src/app/styled.d.ts` — use the tokens, don't hardcode hex/px. The only exceptions
  in the codebase are toast/error accent colors (`#d93025`, `#0f9d58`, `#fdecea`), which are intentionally outside the
  brand palette.
- Global resets live in `src/app/GlobalStyle.ts`.
- Mobile-first: `AuthLayout` / `HomePage` use `width: min(100%, 420px)` — follow that pattern instead of fixed widths.
- Transient styled-components props use the `$`-prefix convention (e.g. `$hasError`, `$variant`) so they aren't
  forwarded to the DOM.

### TypeScript

`strict: true`, `noEmit: true`. `tsconfig.json` only includes `src` — keep production code there.

## Conventions That Are Easy to Miss

- Auth UI is composed from three reusable primitives — `AuthPageFrame`, `AuthForm`, `AuthTextField`. New auth screens
  should compose these rather than rebuilding form/input styling. `AuthTextField` is fully controlled
  (`value` + `onChange(value)`) and renders its own error state; pages own the form state.
- `AuthForm` accepts `isSubmitting`, `pendingLabel`, and `errorMessage` — use these instead of swapping the button or
  rendering ad-hoc error banners.
- Form pages own `values` / `fieldErrors` / `submitError` state. Re-typing in a field clears that field's error and the
  top-level submit error — match this UX when adding new forms.
- File naming: routes are `<name>.route.tsx`, components/pages are `PascalCase.tsx`. Match this exactly — the harness
  explicitly forbids changing naming conventions.
- Harness/feature docs are in Korean. Read them carefully; they encode hard rules, not suggestions.

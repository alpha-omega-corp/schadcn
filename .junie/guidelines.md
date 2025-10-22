Project development guidelines (shadcunt)

Audience: Advanced Vue 3 + Vite + TypeScript developers.
This document captures the project-specific knowledge you’ll want at hand when building, debugging, or extending this codebase.

1) Build and configuration

Core stack
- Runtime/UI: Vue 3, Vue Router, Vue I18n, Vuex
- Tooling: Vite 7, TypeScript, vue-tsc, TailwindCSS 4 (via @tailwindcss/vite)
- Tables: @tanstack/vue-table
- Forms/validation: vee-validate + zod

Scripts (package.json)
- dev: vite
- build: vue-tsc -b && vite build
- preview: vite preview

Vite configuration (vite.config.ts)
- Alias: @ -> <repo>/src
- Dev server: port 4000, open browser=true, strictPort=true, CORS enabled
- Proxy: requests to /api are proxied to http://localhost:3000 with path rewrite removing the /api prefix

Environment variables
- src/http.ts uses environment.VITE_PROXY via src/vite-env.d.ts. Ensure a VITE_PROXY is defined for runtime HTTP calls that bypass the dev-server proxy.
  Example .env.local (adjust to your backend):
    VITE_PROXY=/api
  Notes:
  - In dev, if you set VITE_PROXY=/api, axios requests to proxy(url) will hit the Vite proxy and be forwarded to http://localhost:3000.
  - In staging/prod, point VITE_PROXY to your gateway origin if you don’t use the Vite proxy (e.g., VITE_PROXY=https://api.example.com). Ensure CORS and paths match your backend.

TypeScript configuration gotchas
- The repo uses project references (tsconfig.json references tsconfig.app.json and tsconfig.node.json), and build runs vue-tsc -b (build mode) before bundling.
- Current tsconfig.json has module: commonjs while package.json has "type": "module" and Vite is ESM-first. Prefer relying on tsconfig.app.json for app code and tsconfig.node.json for node/bundler tooling. Avoid directly using tsconfig.json for build inputs.
- If switching vue-tsc to project references, tsconfig.app.json and tsconfig.node.json must be marked composite: true and may not set noEmit: true (TypeScript rules for references). The current configuration causes vue-tsc errors during build.
- verbatimModuleSyntax: tsconfig.node.json sets verbatimModuleSyntax: false (good for Vite), but your SFC script blocks may still be compiled with stricter settings depending on the inherited config. If you encounter errors like "X is a type and must be imported using a type-only import", import with type modifiers:
    import type { CalendarRootEmits, CalendarRootProps, DateValue } from '…'

HTTP helpers (src/http.ts)
- Provides apiGet/apiPost/apiPut/apiDelete/apiPostFormData and createFormData.
- Authorization header is automatically injected from sessionStorage token if present.
- createFormData supports primitives, arrays (primitive/File/Blob arrays as key[]), File/Blob, and falls back to JSON.stringify for objects.
- proxy(url) prefixes the passed path with environment.VITE_PROXY. Validate that VITE_PROXY is always set to avoid malformed URLs.

2) Testing

State of tests
- There is no test framework configured (e.g., Vitest/Jest). The build currently fails at vue-tsc due to TypeScript configuration and type-import issues in some SFCs. Do not assume npm run build will pass until these issues are fixed (see Troubleshooting below).

Quick, dependency-free smoke tests
- You can use Node’s built-in test runner for quick checks without adding dependencies. This is especially useful while the type/build pipeline is being stabilized.
- Example (which has been verified to run here):
  1. Create test/demo.test.mjs with:
       import test from 'node:test'
       import assert from 'node:assert/strict'
       test('math still works', () => {
         assert.equal(2 + 2, 4)
       })
  2. Run it:
       node --test test/demo.test.mjs
  3. Clean up the file thereafter (keep repo tidy).

Recommended path to proper unit tests (Vitest)
- Install dev dependencies:
    npm i -D vitest @vitest/coverage-v8 @vitejs/plugin-vue vue-tsc
- Add scripts in package.json:
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage"
- Create vitest.config.ts (minimal):
    import { defineConfig } from 'vitest/config'
    import vue from '@vitejs/plugin-vue'
    export default defineConfig({
      plugins: [vue()],
      test: { environment: 'jsdom' }
    })
- Example unit test for a utility (src/lib/utils.ts):
    import { describe, it, expect } from 'vitest'
    import { cn } from '@/lib/utils'
    describe('cn', () => {
      it('merges class names', () => {
        expect(cn('a', false && 'b', 'c')).toBe('a c')
      })
    })
- Run tests:
    npm run test

E2E smoke via Vite preview (after build is fixed)
- Build and serve the production bundle locally:
    npm run build
    npm run preview
- Then use a browser or an HTTP client to hit the app at the preview URL. Consider Playwright in the future if e2e is desired.

3) Additional development and debugging notes

Diagnosing current build failures
- vue-tsc build errors observed:
  - Types-only import issues in SFCs (e.g., CalendarComponent.vue): Use import type {...} for types when verbatimModuleSyntax (or similar) is in effect.
  - Missing global/DOM types in SFCs (e.g., HTMLAttributes). Make sure appropriate lib DOM options are included via the inherited @vue/tsconfig preset, or explicitly import types when necessary.
  - Project references not compliant: Set composite: true on tsconfig.app.json and tsconfig.node.json when referenced in tsconfig.json and ensure noEmit is not used in referenced projects when building with -b.
  - Unresolved symbols like useConfigStore in ThemePicker.vue imply a missing store export or incorrect import. Verify the store (likely in src/stores) exposes useConfigStore and that the component imports it from the right path.

Suggested stabilizing steps
- Short term:
  - Keep using node --test for small, isolated tests while correcting TS config and SFC imports.
  - Run Vite dev server (npm run dev) and fix runtime/type issues iteratively.
- Medium term:
  - Fix project references (composite: true) or remove them if not needed; make vue-tsc build pass before enabling CI build.
  - Audit SFCs for type-only imports (import type {...}) and DOM type availability.
  - Add Vitest for unit tests with jsdom environment; start with utils and store modules.

Code style and conventions
- TypeScript strict mode is enabled; noUnusedLocals/Parameters are enabled in tsconfig.app.json; prefer explicit types for public interfaces.
- Paths should use alias @ from vite.config.ts/tsconfig paths.
- HTTP calls should route through src/http.ts helpers; prefer apiPostFormData + createFormData for uploads.
- TailwindCSS is configured via the Vite Tailwind plugin (@tailwindcss/vite). Use tw-merge friendly patterns and cn from src/lib/utils.ts for class composition.

Local dev tips
- Port 4000 is fixed (strictPort); if it’s in use, kill the process or change vite.config.ts locally during debugging.
- VITE_PROXY and the Vite dev proxy handle different concerns. For API calls in app code, prefer using environment.VITE_PROXY to build URLs, letting Vite dev proxy rewrite them in dev.
- sessionStorage token is picked up by src/http.ts; ensure login flows set sessionStorage.setItem('token', ...) before API interactions.

Repro commands snapshot (as of 2025-10-09)
- Dev server: npm run dev
- Attempted build (currently failing at vue-tsc): npm run build
- Node built-in test (verified working): node --test test/demo.test.mjs

Housekeeping
- Keep temporary test files out of the repo. If you create quick Node tests as shown above, delete them after use. Only this .junie/guidelines.md should be committed as part of this task.

# yudao-ui-admin-vben

**Generated:** 2026-07-05

## OVERVIEW

Vben Admin 5 monorepo (pnpm workspace + Turbo). The admin UI for the Yudao platform. Ships 5 app variants with different UI frameworks (Ant Design, Naive UI, Element Plus, TDesign).

## STRUCTURE

```
yudao-ui-admin-vben/
├── apps/
│   ├── web-antd/        # Admin UI — Ant Design Vue (default)
│   ├── web-antdv-next/  # Admin UI — Ant Design Vue Next
│   ├── web-ele/         # Admin UI — Element Plus
│   ├── web-naive/       # Admin UI — Naive UI
│   └── web-tdesign/     # Admin UI — TDesign
├── internal/
│   ├── lint-configs/    # ESLint, commitlint, stylelint, oxlint configs
│   ├── node-utils/      # Shared Node.js utilities
│   ├── tailwind-config/ # Shared Tailwind CSS config
│   ├── tsconfig/        # Shared TypeScript configs
│   └── vite-config/     # Shared Vite configuration
├── docs/                # VitePress documentation site
└── scripts/             # Build/deploy/clean scripts
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Entry point (antd) | `apps/web-antd/src/main.ts` | Vite + Vue app bootstrap |
| Antd app source | `apps/web-antd/src/` | Views, router, stores, API calls |
| Internal vite config | `internal/vite-config/src/` | Shared Vite plugins and presets |
| Lint configs | `internal/lint-configs/` | eslint-config, commitlint-config, etc. |
| Docs | `docs/src/` | VitePress docs (guide, demos, changelog) |

## CONVENTIONS

- pnpm workspace monorepo, Turbo for task orchestration
- Vue 3 + Composition API + TypeScript
- Each app is a full standalone admin UI at `apps/web-{framework}/`
- Vite shared config via `internal/vite-config`
- Lint: ESLint + oxlint + stylelint + commitlint (via lefthook)
- Test: Vitest unit + Playwright e2e
- UI frameworks: Ant Design Vue (default), Naive UI, Element Plus, TDesign

## COMMANDS

```bash
# Dev (antd variant)
pnpm dev:antd

# Build all
pnpm build

# Build specific variant
pnpm build:antd

# Dev (naive variant)
pnpm dev:naive

# Type check
pnpm check:type

# Lint
pnpm lint
```

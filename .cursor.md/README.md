# Datt.ai Frontend

React application for the Datt.ai Careers page and HR admin dashboard.

## Related Repos

| Repo | Purpose |
|------|---------|
| **datt-ai-frontend** (this repo) | Public careers UI + admin dashboard |
| **datt-ai-backend** | REST API, database, email |

## Tech Stack

- React 18 + TypeScript
- Vite
- MUI (Material UI)
- React Query
- Axios + Zod
- Supabase Auth (admin only)

## Prerequisites

- Node.js 20+
- Running backend API (see datt-ai-backend)
- Supabase project

## Setup

```bash
npm install
cp .env.example .env
# Fill in VITE_BACKEND_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

npm run dev
```

App runs at `http://localhost:5173` by default.

## Environment Variables

See `.env.example` for all required variables.

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder structure and patterns |
| [docs/UI-SCREENS.md](docs/UI-SCREENS.md) | Screen specs (from requirements) |
| [docs/SUPABASE-AUTH.md](docs/SUPABASE-AUTH.md) | Admin login integration |
| [docs/API-INTEGRATION.md](docs/API-INTEGRATION.md) | Backend API client usage |

PRDs live in **datt-ai-backend** → `docs/product-requirements/`. Read the relevant PRD before building a feature.

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/careers` | Public | Job listings |
| `/careers/:id` | Public | Job detail + Apply |
| `/careers/:id/apply` | Public | Application form |
| `/admin/login` | Public | Supabase admin login |
| `/admin/*` | Supabase session | HR dashboard |

## Development Rules

1. Read PRD from backend repo before implementing.
2. Reuse existing components in `src/lib/` (MUI theme, form fields, layouts).
3. Follow React Query hook pattern from `src/api/`.
4. Candidates do not log in. Only admin routes use Supabase Auth.

## Source Template

Scaffolded from `Reactjs-template`. Demo `posts/` module will be replaced with `careers/` and `admin/` in Phase 2.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run test` | Unit tests |

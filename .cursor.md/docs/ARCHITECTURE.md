# Frontend Architecture

## Overview

React SPA with public careers routes and Supabase-protected admin routes.

## Folder Structure

```text
src/
├── main.tsx
├── App.tsx
├── api/                    # Axios client + queryClient (reuse from template)
├── auth/
│   ├── supabaseClient.ts
│   ├── useSupabaseAuth.ts
│   └── AdminAuthGuard.tsx
├── careers/                # Public — docx §2, §4, §5
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── Routes.tsx
├── admin/                  # Protected — docx §9
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── Routes.tsx
├── lib/                    # MUI theme, layouts, form fields (reuse)
├── routes/
│   ├── RouterProvider.tsx
│   ├── PublicRoutes.tsx
│   └── PrivateRoutes.tsx
└── environment/
```

## Routing

| Route | Layout | Auth |
|-------|--------|------|
| `/careers` | Public | None |
| `/careers/:id` | Public | None |
| `/careers/:id/apply` | Public | None |
| `/admin/login` | Full screen | None |
| `/admin/dashboard` | Admin menu | Supabase |
| `/admin/jobs` | Admin menu | Supabase |
| `/admin/applications` | Admin menu | Supabase |

## State Management

- **Server state:** React Query hooks per feature (`useGetJobs`, etc.)
- **Auth state:** Supabase session via `useSupabaseAuth`
- **UI state:** Local component state + existing modal hooks

## API Client

Reuse `src/api/api.ts` pattern (axios + zod). Admin hooks attach Supabase token:

```typescript
headers: { Authorization: `Bearer ${session.access_token}` }
```

## Template Migration

| Keep | Replace |
|------|---------|
| MUI theme, layouts, form fields | `posts/` → `careers/` + `admin/` |
| axios + zod API client | Point to backend URL |
| React Query pattern | New hooks per domain |
| Route structure | Update Public/Private routes |

## Design

- Primary color: `#2C9497` (existing MUI theme)
- Responsive breakpoints from template
- Mobile-first careers pages

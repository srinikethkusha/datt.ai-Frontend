# Supabase Auth — Frontend

Admin login only. Candidates apply without authentication.

## Setup

```bash
npm install @supabase/supabase-js
```

## Environment

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Client

```typescript
// src/auth/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
```

## Auth Hook

`useSupabaseAuth` provides:
- `session` — current Supabase session
- `user` — logged-in admin user
- `signIn(email, password)` — admin login
- `signOut()` — logout
- `loading` — session check state

## Route Protection

`PrivateRoutes.tsx` checks session:

```text
/admin/login     → public
/admin/*         → redirect to /admin/login if no session
/careers/*       → always public
```

## API Token

Admin API hooks read session and attach token:

```typescript
const { data: { session } } = await supabase.auth.getSession();
// Authorization: Bearer session.access_token
```

## Login Page

`/admin/login` — email + password form calling `supabase.auth.signInWithPassword()`.

## Notes

- No candidate login in v1.
- No public signup — admins created in Supabase Dashboard.
- Password reset via Supabase built-in flow (optional link on login page).

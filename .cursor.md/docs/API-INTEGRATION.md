# API Integration

Frontend communicates with **datt-ai-backend** via REST.

## Configuration

```env
VITE_BACKEND_API_URL=http://localhost:3000
```

Set in `src/environment/config.ts` (replace jsonplaceholder URL from template).

## Client Pattern

Reuse existing axios + zod pattern from `src/api/api.ts`:

```typescript
import { get, post } from '@src/api/api';
import { jobSchema } from './schemas';
```

## Public Hooks (careers/)

| Hook | Method | Endpoint |
|------|--------|----------|
| `useGetJobs` | GET | `/jobs` |
| `useGetJob` | GET | `/jobs/:id` |
| `useSubmitApplication` | POST | `/applications` (multipart) |

## Admin Hooks (admin/)

All require Supabase token in headers.

| Hook | Method | Endpoint |
|------|--------|----------|
| `useGetAdminJobs` | GET | `/admin/jobs` |
| `useCreateJob` | POST | `/admin/jobs` |
| `useUpdateJob` | PUT | `/admin/jobs/:id` |
| `useGetApplications` | GET | `/admin/applications` |
| `useGetApplication` | GET | `/admin/applications/:id` |
| `useUpdateApplicationStatus` | PATCH | `/admin/applications/:id/status` |
| `useSendInterviewEmail` | POST | `/admin/applications/:id/send-interview` |
| `useSendOfferLetter` | POST | `/admin/applications/:id/send-offer` |

## Resume Upload

Use `FormData` for `POST /applications`:

```typescript
const formData = new FormData();
formData.append('resume', file);
formData.append('jobId', jobId);
// ...other fields
```

## Error Handling

- Show toast on API errors (reuse `useToast` from template)
- Form-level validation errors from 400 responses
- Redirect to login on 401 for admin routes

## Types

Define zod schemas in each feature's `schemas.ts`. Keep in sync with backend DTOs and [API.md](../../datt-ai-backend/docs/API.md).

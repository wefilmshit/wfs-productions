# WFS Productions

Public marketing site for WFS Productions.

## Local Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local overrides.

Key public env vars:

- `VITE_WFS_NYLAS_BOOKING_URL`: public booking link for the contact CTA.
- `VITE_IPE_PUBLIC_ORIGIN`: Intelligent Production Engine public origin used for auth callbacks.
- `VITE_IPE_LOGIN_FALLBACK_URL`: Intelligent Production Engine login URL.
- `VITE_SUPABASE_AUTH_URL`: Supabase GoTrue auth URL used to launch Google/Apple OAuth.

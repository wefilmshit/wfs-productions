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
- `VITE_IPE_LOGIN_FALLBACK_URL`: Intelligent Production Engine login URL.
- `VITE_IPE_OAUTH_GOOGLE_URL`: Google auth start URL for IPE.
- `VITE_IPE_OAUTH_APPLE_URL`: Apple auth start URL for IPE.

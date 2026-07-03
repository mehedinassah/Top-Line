# Top-Line — Deployment Guide

## Architecture

```
Browser ──► Vercel (Next.js frontend + /admin)  ──► Railway (Spring Boot API) ──► Supabase (Postgres)
             https://toplinewear.vercel.app          https://<app>.up.railway.app     session pooler
```

- **Frontend** (store + admin panel): Vercel — already connected to GitHub.
- **Backend** (REST API): Railway — Java can't run on Vercel.
- **Database**: Supabase Postgres (already set up).

The admin panel is the `/admin` route inside the frontend, so it deploys with the
site. It only works once the backend is publicly hosted and the frontend points at it.

---

## Part A — Deploy the backend to Railway

1. Go to **https://railway.app** → sign in with GitHub → **New Project** → **Deploy from GitHub repo** → pick **`mehedinassah/Top-Line`**.
2. After it creates the service, open **Settings**:
   - **Root Directory**: `backend`  ← important (the API lives in a subfolder)
   - **Branch**: `main` (merge the feature branch first — see Part C) or `feat/backend-and-admin` to test now.
   - Railway auto-detects `backend/Dockerfile` and builds with it. No build command needed.
3. Open the **Variables** tab and add the values from the table below.
4. Railway builds and deploys. When it's live, open **Settings → Networking → Generate Domain**.
   You'll get a URL like `https://top-line-production.up.railway.app`.
5. Verify: open `https://<your-railway-domain>/api/products` — you should see JSON with your 15 products.

### Railway environment variables

| Variable | Value |
|----------|-------|
| `DB_HOST` | `aws-1-ap-southeast-2.pooler.supabase.com` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `postgres` |
| `DB_USER` | `postgres.uvmqrtqjroidjiedsojg` |
| `DB_PASSWORD` | *your Supabase database password* |
| `JWT_SECRET` | *a long random string (≥ 64 chars) — generate a fresh one for production* |
| `ADMIN_EMAIL` | `admin@topline.com` |
| `ADMIN_PASSWORD` | *a strong password (change from the dev one)* |
| `ADMIN_NAME` | `Store Admin` |
| `CORS_ALLOWED_ORIGINS` | `https://toplinewear.vercel.app` |

> **Do NOT set** `PORT` (Railway injects it) or `DDL_AUTO` (defaults to `update`;
> setting it to `create` would wipe your data on every deploy).

---

## Part B — Point the frontend at the backend (Vercel)

1. Go to your Vercel project → **Settings → Environment Variables**.
2. Add:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://<your-railway-domain>/api` | Production, Preview, Development |

3. **Redeploy** the Vercel project (Deployments → ⋯ → Redeploy) so the new env var takes effect.

---

## Part C — Merge so the admin panel goes live

The admin panel + API wiring live on the `feat/backend-and-admin` branch. Merge it
into your production branch so Vercel builds the new version:

- Open the PR: https://github.com/mehedinassah/Top-Line/pull/new/feat/backend-and-admin
- Review and **Merge**. Vercel auto-deploys the updated frontend.

---

## Verify end-to-end

1. `https://<railway-domain>/api/products` → JSON list of products ✅
2. `https://toplinewear.vercel.app` → products load from the API ✅
3. `https://toplinewear.vercel.app/admin/login` → sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` ✅
4. Add/edit a product in the admin panel → it appears on the store ✅

## Security reminders before going public

- Change `ADMIN_PASSWORD` and `JWT_SECRET` from the development values.
- Keep `backend/.env` out of git (it already is, via `.gitignore`).

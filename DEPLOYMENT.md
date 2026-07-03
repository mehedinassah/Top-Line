# Top-Line — Deployment Guide

## Architecture

```
Browser ──► Vercel (Next.js frontend + /admin)  ──► Render (Spring Boot API) ──► Supabase (Postgres)
             https://toplinewear.vercel.app          https://<app>.onrender.com      session pooler
```

- **Frontend** (store + admin panel): Vercel — already connected to GitHub.
- **Backend** (REST API): Render free tier — Java can't run on Vercel.
- **Database**: Supabase Postgres (already set up).

> **Render free tier note:** the service sleeps after ~15 min of inactivity, so the
> first request after idle takes ~30–50s to wake. Upgrade to the $7/mo Starter plan
> to keep it always on.

The admin panel is the `/admin` route inside the frontend, so it deploys with the
site. It only works once the backend is publicly hosted and the frontend points at it.

---

## Part A — Deploy the backend to Render

The repo includes `render.yaml`, so the easiest path is a Blueprint:

1. Go to **https://render.com** → sign in with GitHub.
2. **New → Blueprint** → connect and pick **`mehedinassah/Top-Line`**.
3. Render reads `render.yaml` and creates the `topline-api` web service. It will
   prompt for the secret env vars (marked below) — enter them.
4. Click **Apply**. Render builds `backend/Dockerfile` and deploys.
5. When live you get a URL like `https://topline-api.onrender.com`.
6. Verify: open `https://<your-render-url>/api/products` — you should see JSON with your 15 products.
   *(If it was asleep, give it ~40s the first time.)*

**Manual alternative (without the blueprint):** New → **Web Service** → pick the repo →
set **Root Directory = `backend`**, **Runtime = Docker**, **Instance = Free**, then add
the env vars below.

### Secret env vars to enter in Render

| Variable | Value |
|----------|-------|
| `DB_PASSWORD` | *your Supabase database password* |
| `JWT_SECRET` | *a long random string (≥ 64 chars) — fresh for production* |
| `ADMIN_PASSWORD` | *a strong password (change from the dev one)* |

*(The non-secret vars — DB_HOST, DB_USER, CORS, etc. — are already in `render.yaml`.)*

> **Do NOT set** `PORT` (Render injects it) or `DDL_AUTO` (defaults to `update`;
> setting it to `create` would wipe your data on every deploy).

---

## Part B — Point the frontend at the backend (Vercel)

1. Go to your Vercel project → **Settings → Environment Variables**.
2. Add:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://<your-render-url>/api` | Production, Preview, Development |

3. **Redeploy** the Vercel project (Deployments → ⋯ → Redeploy) so the new env var takes effect.

---

## Part C — Merge so the admin panel goes live

The admin panel + API wiring live on the `feat/backend-and-admin` branch. Merge it
into your production branch so Vercel builds the new version:

- Open the PR: https://github.com/mehedinassah/Top-Line/pull/new/feat/backend-and-admin
- Review and **Merge**. Vercel auto-deploys the updated frontend.

---

## Verify end-to-end

1. `https://<render-url>/api/products` → JSON list of products ✅
2. `https://toplinewear.vercel.app` → products load from the API ✅
3. `https://toplinewear.vercel.app/admin/login` → sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` ✅
4. Add/edit a product in the admin panel → it appears on the store ✅

## Security reminders before going public

- Change `ADMIN_PASSWORD` and `JWT_SECRET` from the development values.
- Keep `backend/.env` out of git (it already is, via `.gitignore`).

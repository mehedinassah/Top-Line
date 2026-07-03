# Top-Line

A modern e-commerce store built with **Next.js** (frontend + admin panel), **Spring Boot** (REST API), **PostgreSQL** on Supabase, and JWT authentication.

- 🛍️ **Store:** https://toplinewear.vercel.app
- 🔐 **Admin:** https://toplinewear.vercel.app/admin

## Architecture

```
Browser ─► Vercel (Next.js store + /admin) ─► Render (Spring Boot API) ─► Supabase (Postgres)
```

| Folder | What |
|--------|------|
| `frontend` | Next.js 16 + Tailwind + Framer Motion. Storefront and the `/admin` panel. |
| `backend`  | Spring Boot 3 REST API — JWT auth, JPA, products/cart/orders/wishlist, admin endpoints. |
| `infra`    | Docker / docker-compose for local Postgres. |

## Features

- Catalogue served from the database (rich product descriptions, colours, variants)
- Customer register / login (JWT)
- Cart & checkout → orders persisted to the backend
- **Admin panel**: dashboard, product CRUD, order management, customer list
- Role-based security (`USER` / `ADMIN`)

## Run locally

**Backend** (needs `backend/.env` — copy from `backend/.env.example` and fill in Supabase + secrets):
```powershell
cd backend
./mvnw spring-boot:run          # or:  ./run-dev.ps1   (loads .env for you)
# → http://localhost:8080
```

**Frontend** (needs `frontend/.env.local` with `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api`):
```powershell
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

**Admin login:** `admin@topline.com` (the password is whatever `ADMIN_PASSWORD` was set to on first run).

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** — frontend on Vercel, backend on Render, database on Supabase.

## Environment variables

- Backend: `backend/.env.example` (DB, JWT, admin bootstrap, CORS)
- Frontend: `NEXT_PUBLIC_API_BASE_URL`

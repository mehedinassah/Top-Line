## Top Line

Top Line is a modern e‑commerce platform built with **Next.js** (frontend) and **Spring Boot** (backend), using **PostgreSQL** and **JWT authentication**.

### Structure

- `frontend` – Next.js 14 + Tailwind CSS + Framer Motion UI
- `backend` – Spring Boot 3 REST API with JWT, Postgres
- `infra` – Docker and docker‑compose for backend + Postgres

### Prerequisites

- Node.js 18+ and npm
- Java 21 and Maven
- Docker (optional but recommended)

### Quickstart

```bash
cd frontend
npm install
npm run dev

cd ../backend
mvn spring-boot:run
```

Set environment variables:

- `frontend/.env.local` – `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api`
- `backend` – DB/JWT variables (see `backend/src/main/resources/application.yml`)


# Wire

Wire is a recruiter-friendly, production-oriented real-time chat platform built with React, Express, Socket.IO, MongoDB, Redis, and Nginx.

## Why this project stands out

- Clean frontend/backend separation
- JWT authentication with refresh tokens
- Redis-backed Socket.IO scaling support
- Health checks, structured logging, and security middleware
- Dockerized local and deployment-ready workflow

## Quick demo

- **Live demo:** `<add-url>`
- **Backend API:** `<add-url>`
- **Demo credentials:** `<add-temporary-demo-login-if-needed>`

## What recruiters should open

1. Dashboard
2. Auth flow
3. Docs page
4. Health endpoint

## Run locally

```bash
cd front
docker compose up --build
```

Then open `http://localhost:8080`.

## Project layout

- `front/frontend` — React UI
- `front/backend` — Express API
- `front/docs` — architecture, API, deployment, roadmap
- `front/nginx` — reverse proxy config

For full setup notes, see `front/README.md`.

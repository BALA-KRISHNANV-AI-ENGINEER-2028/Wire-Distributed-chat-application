# Deployment Guide

## Recommended Publish Path

This guide uses Render, Vercel, MongoDB Atlas, and Redis Cloud because they are simple for reviewers to open and verify.

## Step 1: Prepare Databases

1. Create a MongoDB Atlas cluster.
2. Create a Redis Cloud database.
3. Copy the Mongo connection string and Redis connection string.

## Step 2: Deploy The Backend

1. Create a new Render Web Service.
2. Connect the GitHub repository.
3. Select the `backend` folder or use the backend Dockerfile.
4. Set the build and start configuration.

If you are using the Node.js setup:

```bash
npm install
```

```bash
npm start
```

If you are using the Dockerfile, Render can build it directly from `backend/Dockerfile`.

5. Add backend environment variables:

```env
NODE_ENV=production
PORT=4000
MONGO_URI=<atlas-connection-string>
REDIS_URL=<redis-cloud-connection-string>
JWT_ACCESS_SECRET=<strong-secret>
JWT_REFRESH_SECRET=<strong-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=<vercel-url>,<render-url>
```

6. Deploy and open the health endpoint at `/health`.

## Step 3: Deploy The Frontend

1. Create a new Vercel project.
2. Import the same GitHub repository.
3. Set the project root to `frontend`.
4. Use the default Vite build settings.
5. Add the frontend environment variable:

```env
VITE_SOCKET_URL=<backend-or-nginx-url>
```

6. Deploy and open the app URL.

## Step 4: Verify The Public Demo

1. Open the frontend URL in a browser.
2. Confirm the dashboard loads.
3. Confirm login and refresh token flows work.
4. Confirm the socket connection establishes.
5. Confirm the backend health endpoint returns ready status.

## Recruiter Demo Checklist

- Add a live demo link at the top of the README.
- Include screenshots of the dashboard, auth flow, and docs page.
- Include a 60 to 90 second screen recording if a live demo is not available.
- Provide temporary demo credentials if the app is private.
- Mention the deployment stack in the README so reviewers know how to open it.

## Example Environment Variables

Backend:

```env
NODE_ENV=production
PORT=4000
MONGO_URI=<mongo-atlas-connection-string>
REDIS_URL=<redis-connection-string>
JWT_ACCESS_SECRET=<strong-random-secret>
JWT_REFRESH_SECRET=<strong-random-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=<frontend-url>,<nginx-url>
```

Frontend:

```env
VITE_SOCKET_URL=<backend-or-nginx-url>
```

## Scaling Notes

- Build frontend and backend images in CI.
- Store secrets in environment variables or a secret manager.
- Run multiple backend and socket instances behind Nginx or a cloud load balancer.
- Use Redis for adapter synchronization and cache coordination.
- Use MongoDB replicas for durability and scale.

# Demo Guide

This guide explains how a recruiter or reviewer can view the output of Wire without guessing how to run it.

## Preferred Review Flow

1. Open the live frontend URL.
2. Sign in with temporary demo credentials if the app is protected.
3. Navigate to the dashboard to see the product summary.
4. Open the auth flow and docs page to inspect the application structure.
5. Review screenshots or a screen recording if the app is not deployed yet.

## If You Are Running It Locally

1. Start the stack with `docker compose up --build`.
2. Open Nginx on `http://localhost:8080`.
3. Confirm the backend health endpoint at `http://localhost:4000/health`.
4. Verify that the frontend loads and the socket connection establishes.

## What To Show In The Demo

- Dashboard overview
- Authentication flow
- Real-time messaging or socket status
- Docs page with architecture and deployment notes
- Health endpoint response

## Files To Share With Recruiters

- README with live demo URL
- Screenshots of the UI
- Short screen recording
- Deployment guide for reproducibility
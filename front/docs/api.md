# API Documentation

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

## Health
- `GET /health`

## Phase 1 Payloads

```json
{
  "email": "name@example.com",
  "password": "password123",
  "name": "Ava"
}
```

## Socket Events

Client: `connect`, `disconnect`, `typing:start`, `typing:stop`, `message:send`, `message:read`

Server: `user:online`, `user:offline`, `message:new`, `message:delivered`, `message:read`, `notification:new`

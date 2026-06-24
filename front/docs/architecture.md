# System Architecture

```mermaid
flowchart LR
  Browser[React Frontend] --> Nginx[Nginx Reverse Proxy]
  Nginx --> API[Express API]
  Nginx --> WS[Socket.IO Gateway]
  API --> Mongo[(MongoDB)]
  API --> Redis[(Redis Cache + Pub/Sub)]
  WS --> Redis
  WS --> Mongo
  Redis --> WS2[Socket Server N]
  WS2 --> Mongo
```

## Design Decisions

- Clean Architecture keeps controllers thin and business logic in services.
- Redis Pub/Sub and the Socket.IO adapter synchronize presence and messages across nodes.
- MongoDB is the system of record for users, conversations, messages, groups, notifications, and refresh tokens.
- Nginx terminates and routes HTTP and WebSocket traffic.

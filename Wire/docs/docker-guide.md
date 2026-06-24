# Docker Setup Guide

1. Build the stack with `docker compose up --build`.
2. Use MongoDB Compass with a local MongoDB server by setting `MONGO_URI=mongodb://localhost:27017/wire`, or keep the default local container URI `mongodb://mongodb:27017/wire`.
3. Frontend is served on port `80`.
4. Backend API is exposed on port `4000`.
5. MongoDB uses port `27017`.
6. Redis uses port `6379`.
7. Nginx routes `/api` and `/socket.io` to the backend and all other traffic to the frontend.
8. If you want the browser to use nginx for sockets, set `VITE_SOCKET_URL=http://localhost:8080` before building.

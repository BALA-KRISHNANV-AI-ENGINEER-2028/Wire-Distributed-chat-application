import { io } from 'socket.io-client';

export const createSocket = token => io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', {
  autoConnect: false,
  auth: { token }
});

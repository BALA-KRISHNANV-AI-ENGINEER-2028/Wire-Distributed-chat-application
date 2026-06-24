import { createAdapter } from '@socket.io/redis-adapter';

export const initializeSockets = async ({ io, redisClient, logger, onlineUsers }) => {
  io.adapter(createAdapter(redisClient.duplicate(), redisClient.duplicate()));

  io.on('connection', socket => {
    const userId = socket.handshake.auth?.userId;
    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit('user:online', { userId });
    }

    socket.on('typing:start', payload => io.to(payload.conversationId).emit('typing:start', payload));
    socket.on('typing:stop', payload => io.to(payload.conversationId).emit('typing:stop', payload));
    socket.on('message:send', payload => io.to(payload.conversationId).emit('message:new', payload));
    socket.on('message:read', payload => io.to(payload.conversationId).emit('message:read', payload));

    socket.on('disconnect', () => {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit('user:offline', { userId });
      }
      logger.info('Socket disconnected', { socketId: socket.id, userId });
    });
  });
};

export const SOCKET_EVENTS = {
  CLIENT: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    TYPING_START: 'typing:start',
    TYPING_STOP: 'typing:stop',
    MESSAGE_SEND: 'message:send',
    MESSAGE_READ: 'message:read'
  },
  SERVER: {
    USER_ONLINE: 'user:online',
    USER_OFFLINE: 'user:offline',
    MESSAGE_NEW: 'message:new',
    MESSAGE_DELIVERED: 'message:delivered',
    MESSAGE_READ: 'message:read',
    NOTIFICATION_NEW: 'notification:new'
  }
};

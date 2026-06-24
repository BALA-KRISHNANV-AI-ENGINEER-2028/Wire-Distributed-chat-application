import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { createRedisClient } from './config/redis.js';
import { logger } from './utils/logger.js';
import { createAuthRoutes } from './routes/authRoutes.js';
import { createHealthRoutes } from './routes/healthRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { AuthService } from './services/authService.js';
import { UserRepository } from './repositories/userRepository.js';
import { RefreshTokenRepository } from './repositories/refreshTokenRepository.js';
import { initializeSockets } from './sockets/index.js';

const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: env.corsOrigins.length === 1 ? env.corsOrigins[0] : env.corsOrigins,
  credentials: true
};
const io = new Server(server, { cors: corsOptions });
const onlineUsers = new Map();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 150 }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = new AuthService(userRepository, refreshTokenRepository, env);

let redisClient;
let mongoReady = false;
let redisReady = false;

app.use('/api/auth', createAuthRoutes(authService));
app.use('/health', createHealthRoutes({
  isMongoReady: () => mongoReady,
  isRedisReady: () => redisReady,
  getActiveUsers: async () => onlineUsers.size
}));

app.get('/', (req, res) => res.json({ service: 'wire', status: 'ok' }));

app.use(errorHandler);

const start = async () => {
  await connectDatabase(env.mongoUri, logger);
  mongoReady = true;
  redisClient = await createRedisClient(env.redisUrl, logger);
  redisReady = true;
  await initializeSockets({ io, redisClient, logger, onlineUsers });

  server.listen(env.port, () => {
    logger.info(`Wire backend listening on port ${env.port}`);
  });
};

start().catch(error => {
  logger.error('Failed to start backend', { error: error.message });
  process.exit(1);
});

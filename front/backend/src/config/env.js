import dotenv from 'dotenv';

dotenv.config();

const parseOrigins = value => value.split(',').map(origin => origin.trim()).filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://mongodb:27017/wire',
  redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN || 'http://localhost:5173')
};

import { createClient } from 'redis';

export const createRedisClient = async (redisUrl, logger) => {
  const client = createClient({ url: redisUrl });

  client.on('error', error => logger.error('Redis error', { error: error.message }));
  client.on('connect', () => logger.info('Redis connected'));

  await client.connect();
  return client;
};

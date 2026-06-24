import { Router } from 'express';

export const createHealthRoutes = ({ isMongoReady, isRedisReady, getActiveUsers }) => {
  const router = Router();

  router.get('/', async (req, res) => {
    res.json({
      status: 'ok',
      database: isMongoReady() ? 'connected' : 'disconnected',
      redis: isRedisReady() ? 'connected' : 'disconnected',
      activeUsers: await getActiveUsers()
    });
  });

  return router;
};

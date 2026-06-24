import { Router } from 'express';
import Joi from 'joi';
import { createAuthController } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export const createAuthRoutes = authService => {
  const router = Router();
  const controller = createAuthController(authService);

  router.post('/register', ...controller.register);
  router.post('/login', ...controller.login);
  router.post('/refresh', validate(refreshTokenSchema), controller.refresh);
  router.post('/logout', validate(refreshTokenSchema), controller.logout);

  return router;
};

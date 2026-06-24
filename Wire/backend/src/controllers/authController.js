import Joi from 'joi';
import { asyncHandler } from '../middleware/asyncHandler.js';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(80).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const createAuthController = authService => ({
  register: [
    (req, res, next) => {
      const { error, value } = registerSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        return res.status(400).json({ message: 'Validation failed', details: error.details.map(detail => detail.message) });
      }
      req.body = value;
      return next();
    },
    asyncHandler(async (req, res) => {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    })
  ],
  login: [
    (req, res, next) => {
      const { error, value } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        return res.status(400).json({ message: 'Validation failed', details: error.details.map(detail => detail.message) });
      }
      req.body = value;
      return next();
    },
    asyncHandler(async (req, res) => {
      const result = await authService.login(req.body);
      res.json(result);
    })
  ],
  refresh: asyncHandler(async (req, res) => {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  }),
  logout: asyncHandler(async (req, res) => {
    const result = await authService.logout(req.body.refreshToken);
    res.json(result);
  })
});

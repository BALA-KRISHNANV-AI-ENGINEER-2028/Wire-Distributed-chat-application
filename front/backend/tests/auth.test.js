import request from 'supertest';
import express from 'express';
import { jest, describe, it, expect } from '@jest/globals';
import { createAuthRoutes } from '../src/routes/authRoutes.js';

describe('auth routes wiring', () => {
  it('mounts register and login routes', async () => {
    const authService = {
      register: jest.fn().mockResolvedValue({ ok: true }),
      login: jest.fn().mockResolvedValue({ ok: true }),
      refresh: jest.fn(),
      logout: jest.fn()
    };

    const app = express();
    app.use(express.json());
    app.use('/api/auth', createAuthRoutes(authService));

    const response = await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'password123', name: 'Ava' });
    expect(response.status).toBe(201);
    expect(authService.register).toHaveBeenCalled();
  });
});

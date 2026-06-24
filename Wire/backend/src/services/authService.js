import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { decodeToken, signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt.js';

export class AuthService {
  constructor(userRepository, refreshTokenRepository, config) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.config = config;
  }

  async register({ email, password, name }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('Email already in use');
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.userRepository.create({ email, passwordHash, name });
    return this.buildAuthResponse(user);
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    return this.buildAuthResponse(user);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      const error = new Error('Refresh token is required');
      error.statusCode = 400;
      throw error;
    }

    const decoded = verifyToken(refreshToken, this.config.jwtRefreshSecret);
    const stored = await this.refreshTokenRepository.findActiveByTokenId(decoded.tokenId);
    if (!stored) {
      const error = new Error('Refresh token revoked');
      error.statusCode = 401;
      throw error;
    }

    const matchesStoredToken = await bcrypt.compare(refreshToken, stored.tokenHash);
    if (!matchesStoredToken) {
      const error = new Error('Refresh token revoked');
      error.statusCode = 401;
      throw error;
    }

    const user = await this.userRepository.findById(decoded.sub);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return this.buildAuthResponse(user);
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      const error = new Error('Refresh token is required');
      error.statusCode = 400;
      throw error;
    }

    const decoded = verifyToken(refreshToken, this.config.jwtRefreshSecret);
    const stored = await this.refreshTokenRepository.findActiveByTokenId(decoded.tokenId);
    if (!stored) {
      const error = new Error('Refresh token revoked');
      error.statusCode = 401;
      throw error;
    }

    const matchesStoredToken = await bcrypt.compare(refreshToken, stored.tokenHash);
    if (!matchesStoredToken) {
      const error = new Error('Refresh token revoked');
      error.statusCode = 401;
      throw error;
    }

    await this.refreshTokenRepository.revokeByTokenId(decoded.tokenId);
    return { success: true };
  }

  async buildAuthResponse(user) {
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const tokenId = crypto.randomUUID();
    const accessToken = signAccessToken(
      { sub: String(user._id), email: user.email, name: user.name },
      this.config.jwtAccessSecret,
      this.config.jwtAccessExpiresIn
    );
    const refreshToken = signRefreshToken(
      { sub: String(user._id), tokenId },
      this.config.jwtRefreshSecret,
      this.config.jwtRefreshExpiresIn
    );
    const decodedRefreshToken = decodeToken(refreshToken);

    await this.refreshTokenRepository.create({
      userId: user._id,
      tokenId,
      tokenHash: await bcrypt.hash(refreshToken, 10),
      expiresAt: decodedRefreshToken?.exp ? new Date(decodedRefreshToken.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return {
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken
    };
  }

  sanitizeUser(user) {
    return {
      id: String(user._id),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      online: user.online,
      lastSeen: user.lastSeen
    };
  }
}

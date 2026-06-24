import { RefreshToken } from '../models/RefreshToken.js';

export class RefreshTokenRepository {
  async create(tokenData) {
    return RefreshToken.create(tokenData);
  }

  async findActiveByTokenId(tokenId) {
    return RefreshToken.findOne({ tokenId, revokedAt: null });
  }

  async revokeByTokenId(tokenId) {
    return RefreshToken.updateOne({ tokenId }, { revokedAt: new Date() });
  }

  async revokeByUserId(userId) {
    return RefreshToken.updateMany({ userId, revokedAt: null }, { revokedAt: new Date() });
  }
}

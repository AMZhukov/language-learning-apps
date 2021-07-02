// eslint-disable-line
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken.js';
import { ApiErrors } from '../exceptions/ApiErrors.js';

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  generateTokens(payload) {
    const token = jwt.sign(payload, process.env.JWT, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '20d' });
    return {
      token,
      refreshToken,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  validateToken(token) {
    try {
      return jwt.verify(token, process.env.JWT);
    } catch (error) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH);
    } catch (error) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async findRefreshToken(refreshToken) {
    const tokenData = await RefreshToken.findOne({ refreshToken });
    return tokenData;
  }

  // eslint-disable-next-line class-methods-use-this
  async saveToken(userId, refreshToken) {
    const tokenData = await RefreshToken.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    } else await RefreshToken.create({ userId, refreshToken });
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteToken(refreshToken) {
    try {
      await RefreshToken.deleteOne({ refreshToken });
    } catch (error) {
      throw ApiErrors.BadRequest('Токен не найден');
    }
  }
}

export const tokenService = new TokenService();

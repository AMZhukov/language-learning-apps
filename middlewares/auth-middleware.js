// eslint-disable-line
import { ApiErrors } from '../exceptions/ApiErrors.js';
import { tokenService } from '../services/token-service.js';

export const authMiddleware = () => {
  return async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    try {
      if (!authorizationHeader) {
        return next(ApiErrors.UnauthorizedError());
      }
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        return next(ApiErrors.UnauthorizedError());
      }
      const userData = tokenService.validateToken(token);
      if (!userData) {
        return next(ApiErrors.UnauthorizedError());
      }
      req.user = userData;
      return next();
    } catch (error) {
      return next(ApiErrors.UnauthorizedError());
    }
  };
};

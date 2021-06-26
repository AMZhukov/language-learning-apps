// eslint-disable-line
import { ApiErrors } from '../exceptions/ApiErrors.js';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiErrors) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }
  return res.status(500).json({ message: 'Ошибка на стороне сервера' });
};

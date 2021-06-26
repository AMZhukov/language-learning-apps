// eslint-disable-line
import { ApiErrors } from '../exceptions/ApiErrors.js';

export const validateRequest = (schema) => {
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    const body = req.body.registrationData;
    try {
      await schema.validate(body);
      return next();
    } catch (error) {
      next(ApiErrors.BadRequest(error.message));
    }
  };
};

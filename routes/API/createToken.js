// eslint-disable-line
import jwt from 'jsonwebtoken';

export const createToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT,
    { expiresIn: '1h' },
  );
};

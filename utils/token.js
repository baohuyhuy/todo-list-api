import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

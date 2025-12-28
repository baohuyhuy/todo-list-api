import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

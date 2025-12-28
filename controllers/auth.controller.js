import {
  checkUserExists,
  createUser,
  getUserByEmail,
} from '../models/user.model.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await checkUserExists(email);
  if (isUserExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const userId = await createUser(name, email, hashedPassword);

  const { accessToken, refreshToken } = generateToken(userId);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ accessToken });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { id, password: userPassword } = await getUserByEmail(email);

  if (!userPassword || !(await verifyPassword(password, userPassword))) {
    return res
      .status(401)
      .json({ error: 'Login failed', message: 'Invalid email or password' });
  }

  const { accessToken, refreshToken } = generateToken(id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ accessToken });
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Invalid or expired refresh token' });
    }

    const { accessToken } = generateToken(payload.sub);

    return res.json({ accessToken });
  });
};

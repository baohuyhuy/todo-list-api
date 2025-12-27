import { checkUserExists, createUser } from '../models/user.model.js';
import { hashPassword } from '../utils/password.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await checkUserExists(email);
  if (isUserExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const userId = await createUser(name, email, hashedPassword);

  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  res.status(201).json({ token });
};

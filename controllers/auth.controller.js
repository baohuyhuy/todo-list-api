import {
  checkUserExists,
  createUser,
  getUserByEmail,
} from '../models/user.model.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';
import 'dotenv/config';

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await checkUserExists(email);
  if (isUserExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const userId = await createUser(name, email, hashedPassword);

  const token = generateToken(userId);

  res.status(201).json({ token });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { id, password: userPassword } = await getUserByEmail(email);

  if (!userPassword || !(await verifyPassword(password, userPassword))) {
    return res
      .status(401)
      .json({ error: 'Login failed', message: 'Invalid email or password' });
  }

  const token = generateToken(id);

  res.status(200).json({ token });
};

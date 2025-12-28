import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { getTodoById } from '../models/todo.model.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = payload;
    next();
  });
};

export const authorizeUpdatePermission = async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user.sub;
  const todo = await getTodoById(todoId);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  if (todo.user_id !== userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

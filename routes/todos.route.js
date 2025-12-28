import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { createTodoItemController } from '../controllers/todos.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createTodoItemSchema } from '../schemas/todos.schema.js';

const router = Router();

router.post(
  '/',
  authenticateToken,
  validate(createTodoItemSchema),
  createTodoItemController
);

export default router;

import { Router } from 'express';
import {
  authenticateToken,
  authorizeUpdatePermission,
} from '../middlewares/auth.middleware.js';
import {
  createTodoItemController,
  updateTodoItemController,
} from '../controllers/todos.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createTodoItemSchema,
  updateTodoItemSchema,
} from '../schemas/todos.schema.js';

const router = Router();

router.post('/', authenticateToken, createTodoItemController);
router.put('/:id', authenticateToken, updateTodoItemController);
export default router;

import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  createTodoItemController,
  updateTodoItemController,
  deleteTodoItemController,
  getTodoItemsController,
} from '../controllers/todos.controller.js';

const router = Router();

router.post('/', authenticateToken, createTodoItemController);
router.put('/:id', authenticateToken, updateTodoItemController);
router.delete('/:id', authenticateToken, deleteTodoItemController);
router.get('/', authenticateToken, getTodoItemsController);

export default router;

import { createTodoItem, updateTodoItem } from '../models/todo.model.js';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createTodoItemSchema,
  updateTodoItemSchema,
} from '../schemas/todos.schema.js';
import { authorizeUpdatePermission } from '../middlewares/auth.middleware.js';

export const createTodoItemController = [
  validate(createTodoItemSchema),
  async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.sub;
    const todo = await createTodoItem(title, description, userId);
    res.status(201).json(todo);
  },
];

export const updateTodoItemController = [
  authorizeUpdatePermission,
  validate(updateTodoItemSchema),
  async (req, res) => {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;

    const todo = await updateTodoItem(todoId, title, description, completed);
    res.status(200).json(todo);
  },
];

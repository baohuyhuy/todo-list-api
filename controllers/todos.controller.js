import {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../models/todo.model.js';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createTodoItemSchema,
  updateTodoItemSchema,
} from '../schemas/todos.schema.js';
import { authorizeUpdateOrDeletePermission } from '../middlewares/auth.middleware.js';

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
  authorizeUpdateOrDeletePermission,
  validate(updateTodoItemSchema),
  async (req, res) => {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;

    const todo = await updateTodoItem(todoId, title, description, completed);
    res.status(200).json(todo);
  },
];

export const deleteTodoItemController = [
  authorizeUpdateOrDeletePermission,
  async (req, res) => {
    const todoId = req.params.id;
    await deleteTodoItem(todoId);
    res.status(204).send();
  },
];

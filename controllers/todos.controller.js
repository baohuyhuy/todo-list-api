import { createTodoItem } from '../models/todo.model.js';

export const createTodoItemController = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.sub;
  const todo = await createTodoItem(title, description, userId);
  res.status(201).json(todo);
};

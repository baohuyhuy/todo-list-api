import db from '../config/db.js';

export const createTodoItem = async (title, description, userId) => {
  const [todo] = await db('todos').insert(
    { title, description, user_id: userId },
    ['id', 'title', 'description']
  );
  return todo;
};

export const getTodoById = async (id) => {
  const todo = await db('todos')
    .where('id', id)
    .select('id', 'title', 'description', 'user_id')
    .first();
  return todo;
};

export const updateTodoItem = async (id, title, description, completed) => {
  const [todo] = await db('todos')
    .where('id', id)
    .update({ title, description, completed }, [
      'id',
      'title',
      'description',
      'completed',
    ]);
  return todo;
};

export const deleteTodoItem = async (id) => {
  await db('todos').where('id', id).delete();
};

export const getTodoItems = async (page, limit) => {
  const offset = (page - 1) * limit;
  const total = await db('todos')
    .count('id as total')
    .first()
    .then((result) => Number(result.total));
  const totalPages = Math.ceil(total / limit);
  const todoItems = await db('todos')
    .orderBy('created_at', 'desc')
    .offset(offset)
    .limit(limit)
    .select('id', 'title', 'description', 'completed');
  return { todoItems, total, totalPages };
};

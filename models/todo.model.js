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

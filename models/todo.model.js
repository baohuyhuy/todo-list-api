import db from '../config/db.js';

export const createTodoItem = async (title, description, userId) => {
  const [todo] = await db('todos').insert(
    { title, description, user_id: userId },
    ['id', 'title', 'description']
  );
  return todo;
};

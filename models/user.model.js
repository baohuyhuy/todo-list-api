import db from '../config/db.js';

export const checkUserExists = async (email) => {
  const user = await db('users').where('email', email).first();
  return !!user;
};

export const createUser = async (name, email, password) => {
  const id = await db('users').insert({ name, email, password }, ['id']);
  return id;
};

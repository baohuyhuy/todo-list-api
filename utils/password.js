import bcrypt from 'bcrypt';
import 'dotenv/config';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(255, 'Name must be less than 255 characters'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters'),
  }),
});

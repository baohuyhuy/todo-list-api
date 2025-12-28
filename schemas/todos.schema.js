import { z } from 'zod';

export const createTodoItemSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim().min(1, 'Description is required'),
  }),
});

export const updateTodoItemSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim().min(1, 'Description is required'),
    completed: z
      .boolean()
      .refine((val) => val !== undefined, 'Completed is required')
      .refine((val) => typeof val === 'boolean', 'Completed must be a boolean'),
  }),
  params: z.object({
    id: z.coerce.number().int().positive('Invalid todo ID'),
  }),
});

import { Router } from 'express';
import { registerController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), registerController);

export default router;

import { Router } from 'express';
import {
  registerController,
  loginController,
} from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController);

export default router;

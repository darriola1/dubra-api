import { Router } from 'express';
import { authController } from '@/app/container';
import { validateBody } from '../../../shared/middlewares/zod.middleware';
import { RegisterUserSchema, LoginUserSchema, ChangePasswordSchema } from '../../../application/schemas/user.schema';

const router = Router();

// Route to register user with validation
router.post('/register', validateBody(RegisterUserSchema), (req, res) => authController.register(req, res));
// Route to login with validation
router.post('/login', validateBody(LoginUserSchema), (req, res) => authController.login(req, res));
// Route to change password with validation
router.post('/change-password', validateBody(ChangePasswordSchema), (req, res) => authController.changePassword(req, res));
// Route to logout
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Route to register user
router.post('/register', (req, res) => authController.register(req, res));
// Route to login
router.post('/login', (req, res) => authController.login(req, res));
// Route to change password
router.post('/change-password', (req, res) => authController.changePassword(req, res));
// Route to logout
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;

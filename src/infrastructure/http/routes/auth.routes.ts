import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Ruta para registrar usuario
router.post('/register', (req, res) => authController.register(req, res));

export default router;
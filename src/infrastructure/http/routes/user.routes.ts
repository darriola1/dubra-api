import { Router } from 'express';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';
import { getMeController } from '@/infrastructure/http/controllers/user.controller';

const router = Router();

router.get('/me', authMiddleware, getMeController);

export default router;

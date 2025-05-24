import { Router } from 'express';
import { authMiddleware } from '@/shared/middlewares/auth.middleware';
import { getMeController } from '@/infrastructure/http/controllers/user.controller';

const router = Router();
console.log('Entro en router', router);

router.get('/me', authMiddleware, getMeController);

export default router;

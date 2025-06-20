import { Router } from 'express';
import { geocoderController } from '@/app/container';
import { geoCoderLimiter } from '@/shared/middlewares/rateLimiter';


const router = Router();

router.get('/find', geoCoderLimiter, (req, res) => geocoderController.find(req, res));

export default router;

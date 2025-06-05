// src/shared/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verifyToken } from '@/shared/utils/jwt';
import { CustomError } from '../utils/custom.error';

// Extend Express Request interface to include 'user'
declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  	// Primero intentamos obtener el token desde la cookie
  	const token = req.cookies?.token
    
	// Si no está en la cookie, intentamos desde el header (opcional, mientras estamos en desarrollo)
    || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

	if (!token) {
		throw CustomError.unauthorized('Token is missing');
	}

	try {
		const decoded = verifyToken(token) as JwtPayload;
		req.user = decoded;
		next();
	} catch (err) {
		throw CustomError.unauthorized('Invalid or expired token');
	}
};

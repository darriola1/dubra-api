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
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw CustomError.unauthorized('Authorization header is missing');
	}

	const token = authHeader.split(' ')[1];
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

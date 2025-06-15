import { logger } from '@/shared/utils/logger';
import { Request, Response, NextFunction } from 'express';
import { v6 as uuidv6 } from 'uuid';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
	const reqId = uuidv6();
	req.headers['x-request-id'] = reqId;
	const start = Date.now();

	res.on('finish', () => {
		const duration = Date.now() - start;
		logger.info(`[${reqId}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
	});

	next();
};

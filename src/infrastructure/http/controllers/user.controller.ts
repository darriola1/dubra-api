import { Request, Response } from 'express';

export const getMeController = (req: Request, res: Response): void => {
	console.log('Llego al controller', 'getMeController');
	if (!req.user) {
		res.status(401).json({ message: 'No autorizado' });
		return;
	}

	res.status(200).json({
		id: req.user.id,
		email: req.user.email,
	});
};

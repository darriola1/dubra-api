import { Request, Response } from 'express';

export const getMeController = (req: Request, res: Response): void => {
	if (!req.user) {
		res.status(401).json({ message: 'No autorizado' });
		return;
	}

	res.status(200).json({
		user: {
			id: req.user.id,
			email: req.user.email,
		},
	});
};

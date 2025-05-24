import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '@/application/use-cases/login-user.use-case';
import { UserDatasource } from '@/infrastructure/data/prisma/user.datasource';
import { CustomError } from '@/shared/utils/custom.error';
import { reCAPTCHA } from '@/shared/utils/recaptcha';
import { ChangePasswordUserUseCase } from '@/application/use-cases/change-password-user.use-case';

const userRepo = new UserDatasource();

export class AuthController {
	async register(req: Request, res: Response) {
		const registerUser = new RegisterUserUseCase(userRepo);
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		// console.log('req.body', req)
		const { name, email, password, recaptchaToken } = req.body;
		try {
			// const isHuman = await reCAPTCHA(recaptchaToken);
			// if (!isHuman) {
			// 	throw CustomError.badRequest('Falló la verificación de reCAPTCHA');
			// 	// return res.status(400).json({ error: 'Falló la verificación de reCAPTCHA' });
			// }

			//ejecutamos el caso de uso de registro de usuario
			const user = await registerUser.create({ name, email, password });
			res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			});
		} catch (error) {
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async login(req: Request, res: Response) {
		const loginUser = new LoginUserUseCase(userRepo);
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		// console.log('req.body', req)
		const { email, password, recaptchaToken } = req.body;

		try {
			// const isHuman = await reCAPTCHA(recaptchaToken);
			// if (!isHuman) {
			// 	throw CustomError.badRequest('Falló la verificación de reCAPTCHA');

			// 	// return res.status(400).json({ error: 'Falló la verificación de reCAPTCHA' });
			// }

			const result = await loginUser.login({ email, password });

			res.status(200).json({
				token: result.token,
				user: result.user,
			});
		} catch (error) {
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async changePassword(req: Request, res: Response) {
		console.log('Entro al Change password');
		const changePasswordUser = new ChangePasswordUserUseCase(userRepo);
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		const { email, password, newPassword, recaptchaToken } = req.body;

		try {
			// const isHuman = await reCAPTCHA(recaptchaToken);
			// if (!isHuman) {
			// 	throw CustomError.badRequest('Falló la verificación de reCAPTCHA');
			// }

			const result = await changePasswordUser.changePassword({ email, password, newPassword });
			console.log('result', result);

			res.status(200).json({
				message: 'Password updated successfully',
			});
		} catch (error) {
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}
}

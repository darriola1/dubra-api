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
		const isDev = process.env.NODE_ENV === 'development';
		try {
			if (!isDev) {
				const isHuman = await reCAPTCHA(recaptchaToken);
				if (!isHuman) {
					throw CustomError.badRequest('Falló la verificación de reCAPTCHA');
				}
			}

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
		const isDev = process.env.NODE_ENV === 'development';
		try {
			if (!isDev) {
				const isHuman = await reCAPTCHA(recaptchaToken);
				if (!isHuman) {
					throw CustomError.badRequest('Falló la verificación de reCAPTCHA');
				}
			}
			//Se ejecuta el caso de login, donde se valida el usuario y se genera el token
			const result = await loginUser.login({ email, password });

			res
				//se configura la cookie con el token de una manera segura.
				// pbtenemos el token del resultado del caso de uso previo
				.cookie('token', result.token, {
					httpOnly: true, //hace que la cookie no sea accesible desde js
					secure: process.env.NODE_ENV === 'production', // cookies por HTTPS si es production y HTTP si es desarrollo
					sameSite: 'strict', //ayuda a prevenir ataques CSRF, previene que se envíe la cookie en solicitudes de otros sitios
					maxAge: 24 * 60 * 60 * 1000, // 1 dia, se puede modificar
				})
				.status(200)
				.json({
					user: result.user,
				});
		} catch (error) {
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async changePassword(req: Request, res: Response) {
		// console.log('Entro al Change password');
		const changePasswordUser = new ChangePasswordUserUseCase(userRepo);
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		const { email, password, newPassword, recaptchaToken } = req.body;

		try {
			const isHuman = await reCAPTCHA(recaptchaToken);
			if (!isHuman) {
				throw CustomError.badRequest('reCAPTCHA verification failed');
			}

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

	me(req: Request, res: Response) {
		try {
			if (!req.user) {
				throw CustomError.unauthorized('Unauthorized');
			}
			res.status(200).json({ user: req.user });
		} catch (error) {
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;
			res.status(status).json({ error: message });
		}
	}

	logout(_req: Request, res: Response) {
		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
		res.status(200).json({ message: 'Session closed successfully' });
	}
}

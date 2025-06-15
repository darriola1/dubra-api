import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user.use-case';
import { LoginUserUseCase } from '@/application/use-cases/user/login-user.use-case';
import { CustomError } from '@/shared/utils/custom.error';
import { reCAPTCHA } from '@/shared/utils/recaptcha';
import { ChangePasswordUserUseCase } from '@/application/use-cases/user/change-password-user.use-case';
import { logger } from '@/shared/utils/logger';

// const userRepo = new UserDatasource();

export class AuthController {
	constructor(private readonly registerUser: RegisterUserUseCase, private readonly loginUser: LoginUserUseCase, private readonly changePasswordUser: ChangePasswordUserUseCase) {}
	async register(req: Request, res: Response) {
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
			const user = await this.registerUser.create({ name, email, password });
			logger.info(`Usuario registrado: ${user.id} - ${user.email}`);
			res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			});
		} catch (error) {
			logger.error('Error en el registro de usuario:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async login(req: Request, res: Response) {
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
			const result = await this.loginUser.login({ email, password });
			logger.info(`Inicio sesion: ${result.user.id} - ${result.user.email}`);
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
			logger.error('Error en el registro de usuario:', error);
			const message = error instanceof CustomError ? error.message : 'Unexpected error';
			const status = error instanceof CustomError ? error.statusCode : 500;

			res.status(status).json({ error: message });
		}
	}

	async changePassword(req: Request, res: Response) {
		// console.log('Entro al Change password');
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

			const result = await this.changePasswordUser.changePassword({ email, password, newPassword });
			// console.log('result', result);
			logger.info(`Usuario actualizo su contraseña: ${result.user.id} - ${result.user.email}`);
			res.status(200).json({
				message: 'Password updated successfully',
			});
		} catch (error) {
			logger.error('Error en el registro de usuario:', error);
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

	// logout(_req: Request, res: Response) {
	// 	res.clearCookie('token', {
	// 		httpOnly: true,
	// 		secure: process.env.NODE_ENV === 'production',
	// 		sameSite: 'strict',
	// 	});
	// 	res.status(200).json({ message: 'Session closed successfully' });
	// }
	logout(_req: Request, res: Response) {
		try {
			res.clearCookie('token', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			});
			logger.info(`Usuario cerro su sesion`);
			res.status(200).json({ message: 'Session closed successfully' });
		} catch (error) {
			logger.error(`Error en el cierre de session: ${error}`);
			// console.error('Error during logout:', error);
			res.status(500).json({ message: 'An error occurred while logging out' });
		}
	}
}

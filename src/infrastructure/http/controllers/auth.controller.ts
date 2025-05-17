import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '@/application/use-cases/login-user.use-case';
import { UserDatasource } from '@/infrastructure/data/prisma/user.datasource';
import { CustomError } from '@/shared/utils/custom.error';

const userRepo = new UserDatasource();
const registerUser = new RegisterUserUseCase(userRepo);
const loginUser = new LoginUserUseCase(userRepo);

export class AuthController {
	async register(req: Request, res: Response) {
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		// console.log('req.body', req)
		const { name, email, password } = req.body;

		try {
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
		//req es el objeto que recibimos de la petición HTTP
		//res es el objeto que vamos a devolver como respuesta
		//req.body es el cuerpo de la peticion y donde vienen los datos
		//Aca desestructuramos el body para obtener los datos que necesitamos
		// console.log('req.body', req)
		const { email, password } = req.body;

		try {
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
}

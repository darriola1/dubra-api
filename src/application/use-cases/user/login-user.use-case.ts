import { IUserRepository } from '@/domain/repositories/user.repository';
import { LoginDTO, AuthResponseDTO } from '@/application/schemas/user.schema';
import { comparePassword } from '@/shared/utils/hash';
import { generateToken } from '@/shared/utils/jwt';
import { CustomError } from '@/shared/utils/custom.error';

export class LoginUserUseCase {
	/**
	 * Constructor del caso de uso de registro de usuario.
	 * @param userRepo Repositorio de usuarios para interactuar con la base de datos.
	 */
	constructor(private readonly userRepo: IUserRepository) {}

	async login({ email, password }: LoginDTO): Promise<AuthResponseDTO> {
		// 1. Verificamos si ya existe un usuario con ese email
		const user = await this.userRepo.findByEmail(email);
		// 2. Si no existe, lanzamos un error
		if (!user) {
			throw CustomError.unauthorized('Invalid credentials');
		}
		// 3. Comparamos la contraseña
		const isMatch = await comparePassword(password, user.password);
		// 4. Si no coincide, lanzamos un error
		if (!isMatch) {
			throw CustomError.unauthorized('Invalid credentials');
		}
		// 5. Si coincide, generamos un token
		const token = generateToken({ id: user.id, email: user.email });

		// 6. Retornamos el token y los datos del usuario
		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}
}

import { PrismaClient } from '@/generated/prisma/client';
import { IUserRepository } from '@/domain/repositories/user.repository';
import { RegisterDTO, UserDTO } from '@/application/schemas/user.schema';

/**
 * Implementación concreta del repositorio usando Prisma como ORM.
 * si algun dia cambiamos de ORM, solo tenemos que cambiar esta clase
 * y no afecta al resto de la aplicacion
 */
export class UserDatasource implements IUserRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async create(data: RegisterDTO): Promise<UserDTO> {
		const user = await this.prisma.user.create({
			data,
		});

		return user; // Prisma ya devuelve el objeto con id, timestamps...
	}

	async findByEmail(email: string): Promise<UserDTO | null> {
		// este return ya devuelve un usuario porque se basa en el dto
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}

	async changePassword(email: string, newPassword: string): Promise<UserDTO> {
		return await this.prisma.user.update({
			where: { email },
			data: { password: newPassword },
		});
	}
}

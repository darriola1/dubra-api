import { PrismaClient} from '@/generated/prisma/client'
import { UserRepository } from '@/domain/repositories/user.repository';
import { CreateUserDTO, UserDTO } from '@/domain/dtos/user.dto';

const prisma = new PrismaClient();

/**
 * Implementación concreta del repositorio usando Prisma como ORM.
 * si algun dia cambiamos de ORM, solo tenemos que cambiar esta clase
 * y no afecta al resto de la aplicacion
 */
export class UserDatasource implements UserRepository {
	async create(data: CreateUserDTO): Promise<UserDTO> {
		const user = await prisma.usuario.create({
			data,
		});

		return user; // Prisma ya devuelve el objeto con id, timestamps...
	}

	async findByEmail(email: string): Promise<UserDTO | null> {
		// este return ya devuelve un usuario porque se basa en el dto
		return await prisma.usuario.findUnique({
			where: { email },
		});
	}
}

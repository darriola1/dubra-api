import { PrismaClient } from '@/generated/prisma/client';
import { UserRepository } from '@/domain/repositories/user.repository';
import { CreateUserDTO, UserDTO } from '@/domain/dtos/user.dto';

/**
 * Datasource que utiliza una instancia de Prisma para ejecutar las consultas.
 * La instancia de Prisma se inyecta para poder reutilizar la misma conexión
 * en toda la aplicación y facilitar el testing.
 */
export class UserDatasource implements UserRepository {
        constructor(private readonly prisma: PrismaClient) {}

        async create(data: CreateUserDTO): Promise<UserDTO> {
                const user = await this.prisma.usuario.create({
                        data,
                });

		return user; // Prisma ya devuelve el objeto con id, timestamps...
	}

        async findByEmail(email: string): Promise<UserDTO | null> {
                // este return ya devuelve un usuario porque se basa en el dto
                return await this.prisma.usuario.findUnique({
                        where: { email },
                });
        }

        async changePassword(email: string, newPassword: string): Promise<UserDTO>{
                return await this.prisma.usuario.update({
                        where: { email },
                        data: {password: newPassword},
                })
        }
}

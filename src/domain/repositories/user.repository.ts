import { UserDTO, RegisterDTO } from '@/application/schemas/user.schema';

export interface IUserRepository {
	// Promise porque son asincronos
	// CreateUserDTO es el DTO que se manda al crear un usuario
	// UserDTO es el DTO que se devuelve al crear o buscar un usuario
	create(data: RegisterDTO): Promise<UserDTO>;
	findByEmail(email: string): Promise<UserDTO | null>;
	changePassword(email: string, newPassword: string): Promise<UserDTO>;
}

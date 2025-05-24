import { UserDTO, CreateUserDTO } from '@/domain/dtos/user.dto';

export interface UserRepository {
	// Promise porque son asincronos
	// CreateUserDTO es el DTO que se manda al crear un usuario
	// UserDTO es el DTO que se devuelve al crear o buscar un usuario
	create(data: CreateUserDTO): Promise<UserDTO>;
	findByEmail(email: string): Promise<UserDTO | null>;
	changePassword(email: string, newPassword: string): Promise<UserDTO>;
}

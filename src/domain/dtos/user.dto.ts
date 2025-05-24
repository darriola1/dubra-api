// Estas son las interfaces de los DTOs de usuario,
// que son usadas por el repositorio como contratos

export interface CreateUserDTO {
	// interface para crear un usuario, se usa solo al registrar
	// no tiene id, createdAt ni updatedAt ya que lo crea prisma
	name: string;
	email: string;
	password: string;
}

export interface UserDTO {
	// interface para el usuario
	// con los datos minimos hasta el momento
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface LoginUserDTO {
	// interface para el login
	// input → lo que el cliente te manda
	email: string;
	password: string;
}

export interface AuthResponseDTO {
	// interface para la respuesta de autenticacion
	// output → lo que le devolvemos
	token: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
}

export interface ChangePasswordDTO {
	newPassword: string;
	email: string;
	password: string;
}

// import { RegisterDTO, UserDTO } from '@/application/schemas/user.schema';
// import { CustomError } from '@/shared/utils/custom.error';

// /**
//  * Entidad que representa un User dentro del dominio del sistema.
//  * Garantiza que los datos sean válidos antes de usarlos.
//  */
// export class UserEntity {
// 	constructor(public readonly id: number, public readonly name: string, public readonly email: string, public readonly password: string, public readonly createdAt: Date, public readonly updatedAt: Date) {}

// 	/**
// 	 * Método de fábrica que valida y construye una instancia a partir de un DTO
// 	 */
// 	static fromObject(object: UserDTO): UserEntity {
// 		const { id, name, email, password, createdAt, updatedAt } = object;

// 		if (!id) throw CustomError.badRequest('Missing id');
// 		if (!name) throw CustomError.badRequest('Missing name');
// 		if (!email) throw CustomError.badRequest('Missing email');
// 		if (!password) throw CustomError.badRequest('Missing password');
// 		if (!createdAt) throw CustomError.badRequest('Missing createdAt');
// 		if (!updatedAt) throw CustomError.badRequest('Missing updatedAt');

// 		return new UserEntity(id, name, email, password, new Date(createdAt), new Date(updatedAt));
// 	}
// }

import { RegisterDTO, UserDTO } from '@/application/schemas/user.schema'; // alias de CreateUserDTO

export class UserEntity {
	constructor(public readonly name: string, public readonly email: string, public readonly password: string) {}

	static create(data: RegisterDTO): UserEntity {
		return new UserEntity(data.name, data.email, data.password);
	}

	toObject(): RegisterDTO {
		return {
			name: this.name,
			email: this.email,
			password: this.password,
		};
	}
}

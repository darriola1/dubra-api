import { ChangePasswordDTO, UserDTO } from '@/domain/dtos/user.dto';
import { UserRepository } from '@/domain/repositories/user.repository';
import { CustomError } from '@/shared/utils/custom.error';
import { comparePassword, hashPassword } from '@/shared/utils/hash';

export class ChangePasswordUserUseCase {
	constructor(private readonly userRepo: UserRepository) {}

	async changePassword({ email, password, newPassword }: ChangePasswordDTO) {
		const user = await this.userRepo.findByEmail(email);

		if (!user) {
			throw CustomError.unauthorized('Invalid credentials');
		}

		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) {
			throw CustomError.unauthorized('Invalid credentials');
		}

		const isMatch = await comparePassword(newPassword, user.password);
		if (isMatch) {
			throw CustomError.unauthorized('New password should not be the same as old password');
		}

		const hashedPassword = await hashPassword(newPassword);

		const updatedUser: UserDTO = await this.userRepo.changePassword(email, hashedPassword);

		return {
			user: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
			},
		};
	}
}

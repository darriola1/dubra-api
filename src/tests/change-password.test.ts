import { ChangePasswordUserUseCase } from '@/application/use-cases/user/change-password-user.use-case';
import { IUserRepository } from '@/domain/repositories/user.repository';
import { UserDTO } from '@/domain/dtos-unused/user.dto';
import { comparePassword, hashPassword } from '@/shared/utils/hash';

jest.mock('@/shared/utils/hash');

const mockUser: UserDTO = {
	id: 1,
	name: 'Test User',
	email: 'test@example.com',
	password: 'hashed-old-password',
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('ChangePasswordUserUseCase', () => {
	const userRepoMock: jest.Mocked<IUserRepository> = {
		create: jest.fn(),
		findByEmail: jest.fn(),
		changePassword: jest.fn(),
	};

	const useCase = new ChangePasswordUserUseCase(userRepoMock);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('debería cambiar la contraseña exitosamente', async () => {
		userRepoMock.findByEmail.mockResolvedValue(mockUser);
		(comparePassword as jest.Mock).mockImplementation(async (a, b) => {
			return a === 'old-password' && b === 'hashed-old-password';
		});
		(hashPassword as jest.Mock).mockResolvedValue('hashed-new-password');

		userRepoMock.changePassword.mockResolvedValue({
			...mockUser,
			password: 'hashed-new-password',
		});

		const result = await useCase.changePassword({
			email: 'test@example.com',
			password: 'old-password',
			newPassword: 'new-password',
		});

		expect(result).toEqual({
			user: {
				id: mockUser.id,
				name: mockUser.name,
				email: mockUser.email,
			},
		});
		expect(userRepoMock.changePassword).toHaveBeenCalledWith('test@example.com', 'hashed-new-password');
	});

	test('debería lanzar error si el usuario no existe', async () => {
		userRepoMock.findByEmail.mockResolvedValue(null);

		await expect(
			useCase.changePassword({
				email: 'noexiste@example.com',
				password: 'irrelevante',
				newPassword: 'nueva',
			})
		).rejects.toThrow('Invalid credentials');
	});

	test('debería lanzar error si la contraseña actual es incorrecta', async () => {
		userRepoMock.findByEmail.mockResolvedValue(mockUser);
		(comparePassword as jest.Mock).mockResolvedValue(false);

		await expect(
			useCase.changePassword({
				email: 'test@example.com',
				password: 'wrong-password',
				newPassword: 'new-password',
			})
		).rejects.toThrow('Invalid credentials');

		expect(userRepoMock.changePassword).not.toHaveBeenCalled();
	});

	test('debería lanzar error si la nueva contraseña es igual a la actual', async () => {
		userRepoMock.findByEmail.mockResolvedValue(mockUser);
		(comparePassword as jest.Mock).mockResolvedValueOnce(true); // valida contraseña actual
		(comparePassword as jest.Mock).mockResolvedValueOnce(true); // nueva === actual

		await expect(
			useCase.changePassword({
				email: 'test@example.com',
				password: 'old-password',
				newPassword: 'old-password',
			})
		).rejects.toThrow('New password should not be the same as old password');

		expect(userRepoMock.changePassword).not.toHaveBeenCalled();
	});
});

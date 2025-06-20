import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDTO, UserDTO } from '../../domain/dtos/user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { hashPassword } from '../../shared/utils/hash';
import { CustomError } from '../../shared/utils/custom.error';

export class RegisterUserUseCase {
  /**
   * Constructor del caso de uso de registro de usuario.
   * @param userRepo Repositorio de usuarios para interactuar con la base de datos.
   */
  constructor(private readonly userRepo: UserRepository) { }

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const { email, name, password } = user;

    // 1. Verificamos si ya existe un usuario con ese email
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw CustomError.badRequest('Email is already in use');
    }

    // 2. Hasheamos la contraseña
    const hashedPassword = await hashPassword(password);

    // 3. Creamos el nuevo usuario en la base
    const newUser: UserDTO = await this.userRepo.create({
      email,
      name,
      password: hashedPassword,
    });

    // 4. Lo convertimos a una entidad del dominio
    return UserEntity.fromObject(newUser);
  }
}

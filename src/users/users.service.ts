import { Injectable, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('LOWER(user.username) = LOWER(:username)', { username: username.trim() })
        .getOne();

      return user || null;
    } catch (error) {
      this.logger.error(`Error buscando usuario: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al buscar usuario');
    }
  }

  async findById(id: number): Promise<Omit<User, 'password'> | null> {
    try {
      return await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'username', 'createdAt'] // Añade campos necesarios sin password
      });
    } catch (error) {
      this.logger.error(`Error buscando usuario por ID: ${error.message}`);
      throw new InternalServerErrorException('Error al buscar usuario');
    }
  }

  // Ahora no vuelve a hashear, solo guarda lo que recibe
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { username, password } = createUserDto;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      const exists = await this.findByUsername(trimmedUsername);
      if (exists) {
        throw new ConflictException('Nombre de usuario no disponible');
      }

      // Guardar directamente (ya viene hasheada desde AuthService)
      const newUser = this.usersRepository.create({
        username: trimmedUsername,
        password: trimmedPassword,
      });

      const savedUser = await this.usersRepository.save(newUser);

      // Elimina el password del objeto de retorno
      const { password: _, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      this.logger.error(`Error creando usuario: ${error.message}`, error.stack);

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear usuario');
    }
  }
}

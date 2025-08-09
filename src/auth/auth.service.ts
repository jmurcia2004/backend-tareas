import { Injectable, UnauthorizedException, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

type SafeUser = {
  id: number;
  username: string;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SafeUser | null> {
    try {
      const user = await this.usersService.findByUsername(username.trim());

      if (!user?.password) {
        this.logger.warn(`Usuario ${username} no encontrado o sin contraseña`);
        return null;
      }

      // Debugging crítico
      this.logger.debug(`Comparando contraseña para ${username}...`);
      const isMatch = await bcrypt.compare(pass.trim(), user.password);

      if (!isMatch) {
        this.logger.warn(`Falló comparación para ${username} | Hash: ${user.password.substring(0, 15)}...`);
        return null;
      }

      return { id: user.id, username: user.username };
    } catch (error) {
      this.logger.error(`Error en validateUser`, error.stack);
      throw new InternalServerErrorException('Error de autenticación');
    }
  }

  async login(user: SafeUser) {
    try {
      if (!user?.id) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload = {
        username: user.username,
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600 // 1 hora
      };

      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET || 'fallbackSecret',
        })
      };
    } catch (error) {
      this.logger.error(`Error en login`, error.stack);
      throw new InternalServerErrorException('Error al generar token');
    }
  }

  async register(username: string, password: string): Promise<SafeUser> {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      // Validación mejorada
      if (!this.PASSWORD_REGEX.test(trimmedPassword)) {
        throw new ConflictException(
          'La contraseña requiere: 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (@$!%*?&)'
        );
      }

      const existingUser = await this.usersService.findByUsername(trimmedUsername);
      if (existingUser) {
        throw new ConflictException('El nombre de usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(trimmedPassword, 12);
      const newUser = await this.usersService.create({
        username: trimmedUsername,
        password: hashedPassword
      });

      if (!newUser?.id) {
        throw new InternalServerErrorException('Error al persistir usuario');
      }

      this.logger.log(`Usuario registrado: ID ${newUser.id} - ${trimmedUsername}`);
      return { id: newUser.id, username: newUser.username };
    } catch (error) {
      this.logger.error(`Error en registro`, error.stack);
      throw error instanceof ConflictException ? error :
        new InternalServerErrorException('Error en el servidor');
    }
  }
}
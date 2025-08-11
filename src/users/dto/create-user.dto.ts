import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos $constraint1 caracteres'
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no puede exceder $constraint1 caracteres'
  })
  username: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(4, {
    message: 'La contraseña debe tener al menos $constraint1 caracteres'
  })
  password: string;
}

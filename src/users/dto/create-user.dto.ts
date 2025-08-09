import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos $constraint1 caracteres'
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no puede exceder $constraint1 caracteres'
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El nombre de usuario solo puede contener letras, números y guiones bajos'
  })
  username: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos $constraint1 caracteres'
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'La contraseña debe contener: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial',
    }
  )
  password: string;
}
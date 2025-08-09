import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: 'La contraseña debe contener: 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (@$!%*?&)' }
  )
  password: string;
}
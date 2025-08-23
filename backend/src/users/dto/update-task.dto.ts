import { IsOptional, IsString, IsBoolean, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser texto' })
  @MinLength(1, { message: 'El título no puede estar vacío' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;  // ✅ ahora ya puedes actualizarla

  @IsOptional()
  @IsBoolean({ message: 'El campo completed debe ser true o false' })
  completed?: boolean;
}

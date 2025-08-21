import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @IsString({ message: 'El título debe ser texto' })
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;  // ✅ solo la propiedad
}

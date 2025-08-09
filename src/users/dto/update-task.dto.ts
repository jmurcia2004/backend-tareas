import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'El título no puede exceder los 255 caracteres' })
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
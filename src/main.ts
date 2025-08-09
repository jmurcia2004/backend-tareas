import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 👈 Añade esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // Rechaza requests con campos inválidos
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en: ${await app.getUrl()}`); // 👈 URL de inicio
}
bootstrap();
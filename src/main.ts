import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración mejorada del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Elimina propiedades no decoradas
      forbidNonWhitelisted: false, // Permite propiedades adicionales (para PATCH)
      transform: true,          // Transforma tipos automáticamente
      disableErrorMessages: false, // Muestra mensajes detallados de error
      skipMissingProperties: true // Opcional: ignora propiedades faltantes
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en: ${await app.getUrl()}`);
}
bootstrap();
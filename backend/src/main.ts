import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Elimina propiedades no decoradas
      forbidNonWhitelisted: false, // Permite propiedades adicionales (para PATCH)
      transform: true,           // Transforma tipos automáticamente
      disableErrorMessages: false, // Muestra mensajes detallados de error
      skipMissingProperties: true // Ignora propiedades faltantes en PATCH
    })
  );

  const port = process.env.PORT || 3000; // Render asigna PORT automáticamente
  await app.listen(port, '0.0.0.0'); // Escuchar en todas las interfaces
  console.log(`🚀 Servidor corriendo en: ${await app.getUrl()}`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // Importación crítica

@Module({
  imports: [
    ConfigModule.forRoot(), // Para variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://postgres:admin123@localhost:5432/taskdb',
      entities: [Task, User],
      synchronize: true, // Solo para desarrollo
    }),
    TasksModule,
    UsersModule,
    AuthModule, // Asegúrate de que esté aquí
  ],
})
export class AppModule {}
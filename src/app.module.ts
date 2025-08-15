import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Variables de entorno disponibles en todo el proyecto
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://postgres:admin123@localhost:5432/taskdb',
      entities: [Task, User],
      synchronize: true, // Solo para desarrollo (poner false en producción)
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL solo en prod
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

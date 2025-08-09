import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users') // Nombre explícito de tabla
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255 // Para almacenar el hash bcrypt
  })
  password: string;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true // Opcional: borrado en cascada
  })
  tasks: Task[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
}
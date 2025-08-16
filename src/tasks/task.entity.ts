import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tasks') // Nombre explícito de tabla
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string; // ✅ Nueva columna para la descripción

  @Column({
    type: 'boolean',
    default: false
  })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE' // Borra tareas si se elimina el usuario
  })
  @JoinColumn({ name: 'user_id' }) // Columna FK en BD
  user: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
}

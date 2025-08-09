import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAllByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'] // Opcional: carga la relación con usuario
    });
  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId } // Asocia la tarea al usuario
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } }
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada o no tienes permisos`);
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.taskRepository.delete({
      id,
      user: { id: userId }
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada o no tienes permisos`);
    }
  }
}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  BadRequestException
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  private getUserId(req: Request): number {
    // Adaptar para que funcione con lo que devuelve JwtStrategy
    const user = req.user as { id?: number; userId?: number };

    const id = user?.id ?? user?.userId; // Prioriza id, sino usa userId
    if (!id) {
      throw new BadRequestException('Usuario no autenticado correctamente');
    }
    return id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.tasksService.create(createTaskDto, this.getUserId(req));
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.tasksService.findAllByUser(this.getUserId(req));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request
  ) {
    return this.tasksService.update(id, updateTaskDto, this.getUserId(req));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ) {
    return this.tasksService.remove(id, this.getUserId(req));
  }
}

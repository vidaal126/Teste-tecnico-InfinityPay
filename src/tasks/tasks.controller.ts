import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { LinkUserTaskDto } from './dto/link-tasks.dto';
import { FindTaskDto } from './dto/exists-tasks.dto';
import { EditStatusDto } from './dto/edit-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
  @UseGuards(AuthGuard)
  @Patch('link-user-task')
  async linkUserTasks(@Body() linkUserTaskDto: LinkUserTaskDto) {
    return this.tasksService.linkUserTasks(linkUserTaskDto);
  }
  @UseGuards(AuthGuard)
  @Get('find-task')
  async findTaskDto(@Body() findTaskDto: FindTaskDto) {
    return this.tasksService.findTask(findTaskDto);
  }

  @UseGuards(AuthGuard)
  @Patch('edit-status')
  async editStatus(@Body() editStatusDto: EditStatusDto) {
    return this.tasksService.editStatus(editStatusDto);
  }
}

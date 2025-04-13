import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '@app/prisma';
import { Role } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { TResponseFindUser } from 'src/@types/create-tasks.type';
import { LinkUserTaskDto } from './dto/link-tasks.dto';
import { FindTaskDto } from './dto/exists-tasks.dto';
import { EditStatusDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const existsUser: TResponseFindUser = await this.usersService.findUser({
        user_id: createTaskDto.user_id,
      });

      if (!existsUser.success) {
        return {
          message: existsUser.message,
          success: existsUser.success,
          status: existsUser.status,
        };
      }

      if (existsUser.data?.role === Role.EMPLOYEE) {
        return {
          message: 'Você não tem credenciail para criar tarefas',
          success: false,
          status: HttpStatus.UNAUTHORIZED,
        };
      }

      const create = await this.prisma.tasks.create({
        data: createTaskDto,
      });
      return create;
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao criar tarefa',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao salvar no banco',
      };
    }
  }

  async linkUserTasks(linkUserTask: LinkUserTaskDto) {
    try {
      const countLinkedUser = await this.prisma.usersTasks.count({
        where: {
          task_id: linkUserTask.task_id,
        },
      });

      const verifyUserTask = await this.prisma.usersTasks.findFirst({
        where: {
          user_id: linkUserTask.user_id,
        },
      });

      if (verifyUserTask) {
        return {
          message: 'Usuário ja vinculado na tarefa',
          success: false,
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }

      if (countLinkedUser <= 3) {
        return {
          message: 'Limite de usuários excedidos para essa tarefa.',
          success: false,
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }

      const linkUserTasks = await this.prisma.usersTasks.create({
        data: {
          user_id: linkUserTask.user_id,
          task_id: linkUserTask.task_id,
        },
      });
      return {
        message: `Usuário com id:${linkUserTask.user_id} vinculado com sucesso`,
        success: false,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao vincular usuário na tarefa',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao salvar no banco',
      };
    }
  }

  async findTask(findTaskDto: FindTaskDto) {
    const existTask = await this.prisma.tasks.findUnique({
      where: {
        task_id: findTaskDto.task_id,
      },
    });

    if (!existTask) {
      return {
        message: 'A tarefa não existe',
        success: false,
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      message: 'tarefa encontrada',
      success: true,
      status: HttpStatus.OK,
      data: existTask,
    };
  }

  async editStatus(editTaskDto: EditStatusDto) {
    const { user_id } = editTaskDto;

    try {
      const userDto = { user_id: editTaskDto.user_id };

      const taskDto = {
        task_id: editTaskDto.task_id,
      };

      const existUser = await this.usersService.findUser(userDto);

      const existTask = await this.findTask(taskDto);

      if (!existUser.success) {
        return {
          message: existUser.message,
          success: existUser.success,
          status: existUser.status,
        };
      }

      if (
        existUser.data?.role === 'EMPLOYEE' &&
        existTask.data?.user_id !== user_id
      ) {
        return {
          message: 'Se voce não for gerente, voce não pode alterar essa tarefa',
          success: false,
          status: HttpStatus.FORBIDDEN,
        };
      }

      if (existTask.data?.status === editTaskDto.status) {
        return {
          message: `Tarefa ja possui o status ${editTaskDto.status}`,
          success: false,
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }

      if (!existTask.success) {
        return {
          message: existTask.message,
          succes: existTask.success,
          status: existTask.status,
          data: existTask.data,
        };
      }
      await this.prisma.tasks.update({
        where: {
          task_id: editTaskDto.task_id,
        },
        data: {
          status: editTaskDto.status,
        },
      });
      return {
        message: 'Status atualizado com sucesso',
        success: true,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Não foi posisvel editar a tarefa',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          error instanceof Error
            ? error.message
            : 'Não foi posisvel editar a tarefa',
      };
    }
  }
}

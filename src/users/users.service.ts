import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'utils/bcrypt';
import { Role } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existsUser = await this.prisma.users.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (existsUser) {
        return {
          message: 'Usuário ja existe',
          success: false,
          status: HttpStatus.CONFLICT,
        };
      }
      const hashedPassword = await hashPassword(createUserDto.password);

      const create = await this.prisma.users.create({
        data: {
          name: createUserDto.name,
          password: hashedPassword,
          email: createUserDto.email,
          role: Role.EMPLOYEE,
        },
        omit: { user_id: true, password: true },
      });

      return {
        message: 'Usuário criado com sucesso!',
        success: true,
        status: HttpStatus.CREATED,
        data: create,
      };
    } catch (error) {
      return {
        message:
          error instanceof Error ? error.message : 'Erro ao criar usuário.',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findUser(findUserDto: FindUserDto) {
    try {
      const foundUser = await this.prisma.users.findFirst({
        where: {
          OR: [{ email: findUserDto.email }, { user_id: findUserDto.user_id }],
        },
        // omit: { password: true, user_id: true },
      });

      if (!foundUser) {
        return {
          message: 'Usuário não encontrado',
          success: false,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        message: 'Usuário encontrado',
        success: true,
        status: HttpStatus.OK,
        data: foundUser,
      };
    } catch (error) {
      return {
        message: 'Erro interno no servidor',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
  async updateUserRole(updateUserDto: UpdateUserDto) {
    try {
      const existsUser = await this.findUser({
        user_id: updateUserDto.user_id,
      });

      if (!existsUser.success) {
        return {
          message: existsUser.message,
          success: existsUser.success,
          status: existsUser.status,
        };
      }

      if (existsUser.data?.role == updateUserDto.role) {
        return {
          message: 'Usuário já tem esse cargo',
          success: false,
          status: HttpStatus.CONFLICT,
        };
      }

      const updatedUserRole = await this.prisma.users.update({
        where: { user_id: updateUserDto.user_id },
        data: {
          role: updateUserDto.role,
        },
        omit: { password: true, email: true, user_id: true },
      });

      return {
        message: 'Usuário agora é um gerente',
        success: true,
        status: HttpStatus.OK,
        updatedUserRole,
      };
    } catch (error) {
      return {
        message: 'Ocorreu um erro ao buscar no banco de dados',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao salvar no banco',
      };
    }
  }
}

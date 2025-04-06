import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'utils/bcrypt';
import { Role } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';

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
      const foundUser = await this.prisma.users.findUnique({
        where: { email: findUserDto.email },
        omit: { password: true, user_id: true },
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
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersAuthDto } from './dto/user-auth.dto';
import { comparePassword } from 'utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async sign(authDto: UsersAuthDto) {
    try {
      const existUser = await this.usersService.findUser({
        email: authDto.email,
      });

      if (!existUser.success || !existUser.data?.password) {
        return {
          message: existUser.message,
          success: existUser.success,
          status: existUser.status,
        };
      }
      const passwordMatch = await comparePassword(
        authDto.password,
        existUser.data?.password,
      );
      if (!passwordMatch) {
        return {
          message: 'Senha incorreta',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const { password, ...result } = existUser.data;
      const payload = {
        user_id: existUser.data?.user_id,
        useremail: existUser.data?.email,
      };

      return {
        message: 'Login bem-sucedido',
        success: true,
        status: HttpStatus.ACCEPTED,
        user: { name: result.name },
        token: {
          accessToken: await this.jwtService.signAsync(payload),
        },
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

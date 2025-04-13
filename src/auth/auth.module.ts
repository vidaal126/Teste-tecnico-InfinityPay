import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/prisma';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'segredo-super-seguro',
      signOptions: {
        expiresIn: '3060s',
      },
    }),
    PrismaModule,
    UsersModule,
  ],
})
export class AuthModule {}

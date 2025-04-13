import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(Role)
  role: Role;
}

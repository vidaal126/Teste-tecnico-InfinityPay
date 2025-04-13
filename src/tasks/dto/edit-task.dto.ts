import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

export class EditStatusDto {
  @IsInt()
  @IsNotEmpty()
  task_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}

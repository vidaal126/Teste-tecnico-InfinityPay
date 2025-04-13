import { IsInt, IsNotEmpty } from 'class-validator';

export class LinkUserTaskDto {
  @IsNotEmpty()
  @IsInt()
  task_id: number;

  @IsNotEmpty()
  @IsInt()
  user_id: number;
}

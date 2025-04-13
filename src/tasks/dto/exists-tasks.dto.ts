import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindTaskDto {
  @IsNotEmpty()
  @IsNumber()
  task_id: number;
}

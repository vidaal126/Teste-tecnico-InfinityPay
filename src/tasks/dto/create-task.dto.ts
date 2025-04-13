import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinDate,
  minDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date(), {
    message: 'A data precisa ser maior que a atual.',
  })
  dead_line: Date;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

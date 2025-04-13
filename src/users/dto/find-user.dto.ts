import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  user_id?: number;
}

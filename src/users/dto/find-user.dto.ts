import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

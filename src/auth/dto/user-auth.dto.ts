import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('find-user')
  find(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }
  @UseGuards(AuthGuard)
  @Patch('update-user')
  updateUserRole(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserRole(updateUserDto);
  }
}

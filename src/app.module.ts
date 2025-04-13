import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}

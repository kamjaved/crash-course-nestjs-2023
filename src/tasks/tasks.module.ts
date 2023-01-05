import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Task]), AuthModule],
	controllers: [TasksController],
	providers: [TasksService, TaskRepository],
})
export class TasksModule {}

import { TodoRepository } from './todo.repository';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
	imports: [TypeOrmModule.forFeature([Todo])],
	controllers: [TodoController],
	providers: [TodoService, TodoRepository],
})
export class TodoModule {}

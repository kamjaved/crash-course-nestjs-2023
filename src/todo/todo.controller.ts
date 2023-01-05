import { TodoService } from './todo.service';
import { Controller, Get } from '@nestjs/common';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Get()
	getAllTodo(): Promise<Todo[]> {
		return this.todoService.getAllTodo();
	}
}

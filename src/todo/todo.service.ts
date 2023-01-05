import { TodoRepository } from './todo.repository';
import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
	constructor(private todoRepository: TodoRepository) {}

	async getAllTodo(): Promise<Todo[]> {
		return this.todoRepository.find();
	}
}

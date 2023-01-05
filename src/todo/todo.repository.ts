import { Todo } from './todo.entity';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class TodoRepository extends Repository<Todo> {
	constructor(private dataSource: DataSource) {
		super(Todo, dataSource.createEntityManager());
	}
}

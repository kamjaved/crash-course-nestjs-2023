import { User } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.status';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './task.entity';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	Logger,
} from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
	private logger = new Logger();
	constructor(private dataSource: DataSource) {
		super(Task, dataSource.createEntityManager());
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = createTaskDto;

		const task = this.create({
			title,
			description,
			status: TaskStatus.OPEN,
			user,
		});

		await this.save(task);
		return task;
	}

	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		const { search, status, skip, take } = filterDto;
		const query = this.createQueryBuilder('task');
		query.where({ user });
		query.take(Number(take));
		query.skip(Number(skip));

		if (status) {
			query.andWhere('task.status=:status', { status });
		}

		if (search) {
			query.andWhere(
				'(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
				{ search: `%${search}%` }
			);
		}

		try {
			const tasks = await query.getMany();
			return tasks;
		} catch (error) {
			this.logger.error(
				`Failed to get tasks for user "${
					user.username
				}". Filters: ${JSON.stringify(filterDto)}`,
				error.stack
			);
			throw new InternalServerErrorException();
		}
	}
}

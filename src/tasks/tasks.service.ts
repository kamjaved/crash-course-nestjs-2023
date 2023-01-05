import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(private taskRepository: TaskRepository) {}

	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto, user);
	}

	async getTaskById(id: string, user: User): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id, user } });
		if (!task) {
			throw new NotFoundException();
		}
		return task;
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}

	async deleteTask(id: string, user: User): Promise<void> {
		const result = await this.taskRepository.delete({ id, user });
		if (result.affected === 0) {
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}
	}

	async updateTaskStatus(
		id: string,
		status: TaskStatus,
		user: User
	): Promise<Task> {
		const task = await this.getTaskById(id, user);
		task.status = status;
		await this.taskRepository.save(task);
		return task;
	}
}

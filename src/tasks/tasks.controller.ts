import { GetUser } from './../auth/get-currentuser-decorator';
import { User } from './../auth/user.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	private logger = new Logger('TaskController');

	constructor(private tasksService: TasksService) {}

	@Get()
	getTasks(
		@Query() filterDto: GetTasksFilterDto,
		@GetUser() user: User
	): Promise<Task[]> {
		this.logger.verbose(`User, ${user.username}`);
		return this.tasksService.getTasks(filterDto, user);
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
		return this.tasksService.getTaskById(id, user);
	}

	@Post()
	createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User
	): Promise<Task> {
		return this.tasksService.createTask(createTaskDto, user);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
		return this.tasksService.deleteTask(id, user);
	}

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body() updateTaskStatusDto: UpdateTaskStatusDto,
		user: User
	): Promise<Task> {
		return this.tasksService.updateTaskStatus(
			id,
			updateTaskStatusDto.status,
			user
		);
	}
}

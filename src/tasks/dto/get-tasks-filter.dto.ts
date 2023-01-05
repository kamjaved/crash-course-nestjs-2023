import { PaginationInput } from './../../shared/pagination/pagination.input';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.status';

export class GetTasksFilterDto extends PaginationInput {
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@IsOptional()
	@IsNotEmpty()
	search?: string;
}

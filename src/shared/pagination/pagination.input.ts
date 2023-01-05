import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInput {
	@IsOptional()
	skip?: number = 0;

	@IsOptional()
	take?: number = 0;
}

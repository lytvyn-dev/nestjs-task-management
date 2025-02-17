import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from "../task-status-enum";

export class GetTasksFilterDto {
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	search?: string;
}
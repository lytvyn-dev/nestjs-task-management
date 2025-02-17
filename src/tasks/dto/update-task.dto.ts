import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status-enum";

export class UpdateTaskByIdDto {
	@IsEnum(TaskStatus)
	status: TaskStatus;
}
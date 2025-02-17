import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) { }

	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> | undefined {
		return this.taskService.getTasks(filterDto);
	}

	@Get('/:id')
	async getTaskById(@Param('id') id: string): Promise<Task> {
		return await this.taskService.getTaskById(id);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTaskById(@Param('id') id: string): Promise<void> {
		return this.taskService.deleteTaskById(id);
	}

	@Patch('/:id/status')
	updateTaskById(
		@Param('id') id: string,
		@Body() updateTaskByIdDto: UpdateTaskByIdDto,
	): Promise<Task> {
		return this.taskService.updateTaskById(id, updateTaskByIdDto)
	}
};
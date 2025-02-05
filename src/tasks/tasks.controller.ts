import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) { }

	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
		if (!(Object.keys(filterDto).length)) return this.taskService.getAllTasks();
		return this.taskService.getFilteredTasks(filterDto);
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task | undefined {
		return this.taskService.getTaskById(id)
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.taskService.createTask(createTaskDto)
	}

	@Delete('/:id')
	deleteTaskById(@Param('id') id: string): void {
		return this.taskService.deleteTaskById(id);
	}

	@Patch('/:id/status')
	updateTaskById(
		@Param('id') id: string,
		@Body() updateTaskByIdDto: UpdateTaskByIdDto,
	): Task {
		return this.taskService.updateTaskById(id, updateTaskByIdDto)
	}
};
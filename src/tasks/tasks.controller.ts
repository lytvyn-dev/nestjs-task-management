import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) { }

	@Get()
	getTaskById(@Query('id') id: string): Task | undefined {
		return this.taskService.getTaskById(id)
	}

	@Get()
	getAllTasks(): Task[] {
		return this.taskService.getAllTasks();
	}

	@Post()
	createTask(@Body() createTaskDto: createTaskDto): Task {
		return this.taskService.createTask(createTaskDto)
	}
};
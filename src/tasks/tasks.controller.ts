import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskByIdDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) { }

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task | undefined {
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

	@Delete('/:id')
	deleteTaskById(@Param('id') id: string): void {
		return this.taskService.deleteTaskById(id);
	}

	@Patch('/:id/status')
	updateTaskById(@Param('id') id: string, @Body() updateTaskByIdDto: updateTaskByIdDto): Task {
		return this.taskService.updateTaskById(id, updateTaskByIdDto)
	}
};
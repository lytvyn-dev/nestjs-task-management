import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { Task } from './task.entity';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
	constructor(
		private readonly tasksRepository: TasksRepository,
	) { }

	getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksRepository.getTasks(filterDto);
	}

	createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto);
	}

	async getTaskById(id: string): Promise<Task> {
		const foundedTask = await this.tasksRepository.findOne({ where: { id } });

		if (!foundedTask) throw new NotFoundException(`Task with id-${id} not found!`);
		return foundedTask;
	}

	async deleteTaskById(id: string): Promise<void> {
		const { affected } = await this.tasksRepository.delete({ id });
		if (affected === 0) throw new NotFoundException(`Task with id-${id} not found!`);
	}

	async updateTaskById(id: string, updateTaskByIdDto: UpdateTaskByIdDto): Promise<Task> {
		const { status } = updateTaskByIdDto;
		const taskToUpdate = await this.tasksRepository.findOne({ where: { id } });
		if (!taskToUpdate) throw new NotFoundException(`Task with id-${id} not found!`);

		taskToUpdate.status = status;
		await this.tasksRepository.save(taskToUpdate);

		return taskToUpdate;
	}
}

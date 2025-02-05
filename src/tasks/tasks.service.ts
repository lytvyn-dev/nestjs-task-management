import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskByIdDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [
		{
			id: '1',
			status: TaskStatus.DONE,
			description: 'My first task description',
			title: 'My first task title'
		},
		{
			id: '2',
			status: TaskStatus.DONE,
			description: 'My second task description',
			title: 'My second task title'
		},
		{
			id: '3',
			status: TaskStatus.IN_PROGRESS,
			description: 'My third task description',
			title: 'My third task title'
		},
	];

	getAllTasks() {
		return this.tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		}

		this.tasks.push(task);

		return task;
	}

	getTaskById(id: string): Task | undefined {
		return this.tasks.find(task => task.id === id);
	}

	deleteTaskById(id: string): void {
		this.tasks = this.tasks.filter(task => task.id !== id);
	}

	updateTaskById(id: string, updateTaskByIdDto: UpdateTaskByIdDto): Task {
		const { status } = updateTaskByIdDto;
		const taskToUpdate = this.getTaskById(id);
		if (!taskToUpdate) throw new Error('No task with provided id was found!')
		taskToUpdate.status = status;

		this.tasks = [...this.tasks, taskToUpdate];
		return taskToUpdate;
	}

	getFilteredTasks(queryParams: GetTasksFilterDto): Task[] {
		const { status, search } = queryParams;
		let filteredTasks: Task[] = this.getAllTasks();

		if (status) {
			filteredTasks = filteredTasks.filter(task => task.status === status);
		}

		if (search) {
			filteredTasks = filteredTasks.filter(task => task.title.startsWith(search));
		}

		return filteredTasks;
	}
}

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

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
			status: TaskStatus.OPEN,
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

	createTask(title: string, description: string): Task {
		const task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		}

		this.tasks.push(task);

		return task;
	}
}

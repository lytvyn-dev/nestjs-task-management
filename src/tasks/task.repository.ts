import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { Task } from "./task.entity";
import { TaskStatus } from "./task-status-enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksRepository extends Repository<Task> {
	constructor(private readonly dataSource: DataSource) {
		super(Task, dataSource.createEntityManager());
	}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const { status, search } = filterDto;
		const query = this.createQueryBuilder('task');

		if (status) {
			query.andWhere('task.status = :status', { status })
		}

		if (search) {
			query.andWhere(
				'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
				{ search: `%${search}%` }
			)
		}

		return query.getMany();
	}

	async createTask(createTaskDto: CreateTaskDto) {
		const { title, description } = createTaskDto;

		const newTask = this.create({
			title,
			description,
			status: TaskStatus.DONE,
		});

		await this.save(newTask);
		return newTask;
	}
}; 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule],
	controllers: [TasksController],
	providers: [TasksService, TasksRepository],
})
export class TasksModule { }

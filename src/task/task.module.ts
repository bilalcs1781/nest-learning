import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { EmailHandlerModule } from 'src/email-handler/email-handler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    EmailHandlerModule,
    ConfigModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

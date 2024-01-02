import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { createUserDto } from 'src/user/dto/user-create.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModal: Model<Task>) {}

  create(createUserDto: createUserDto) {
    const newUser = new this.taskModal(createUserDto);
    return newUser.save();
  }
}

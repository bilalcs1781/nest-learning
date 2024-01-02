import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { createUserDto } from 'src/user/dto/user-create.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  store(@Body() createUserDto: createUserDto) {
    return this.taskService.create(createUserDto);
  }
}

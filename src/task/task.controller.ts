import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createUserDto } from 'src/user/dto/user-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  store(@Body() createUserDto: createTaskDto, @Request() req: any) {
    // createTaskDto.userId = req.user.id;
    const userId = req.user.id;

    return this.taskService.create(createUserDto, userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getByUserId(@Request() req: any) {
    const userId = req.user.id;

    // Call your task service to retrieve tasks associated with the user
    const tasks = await this.taskService.getTasksByUserId(userId);
    return tasks;
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  handleFileUpload(@UploadedFile() file: Express.Multer.File) {
    return 'File Upload Api';
  }
}

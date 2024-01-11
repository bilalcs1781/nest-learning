import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createUserDto } from 'src/user/dto/user-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  store(@Body() createUserDto: createUserDto) {
    return this.taskService.create(createUserDto);
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

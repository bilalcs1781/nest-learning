import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createUserDto } from 'src/user/dto/user-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Taks')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  store(@Body() createUserDto: createUserDto, @Query('userId') userId: string) {
    return this.taskService.create(createUserDto, userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/file')
  // @ApiOperation({ summary: 'Upload file' })
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: 'public/img',
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    // type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    const uploadResult = await this.taskService.uploadImage(file);
    return uploadResult;
  }
}

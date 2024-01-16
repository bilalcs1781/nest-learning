import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { createUserDto } from 'src/user/dto/user-create.dto';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
  v2,
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModal: Model<Task>) {}

  create(createUserDto: createUserDto) {
    const newUser = new this.taskModal(createUserDto);
    return newUser.save();
  }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailHandlerService } from 'src/email-handler/email-handler.service';
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
  constructor(
    @InjectModel(Task.name) private taskModal: Model<Task>,
    private readonly emailService: EmailHandlerService,
  ) {}

  create(createUserDto: createUserDto, userId: string) {
    console.log(userId);
    const newUser = new this.taskModal({ ...createUserDto, userId });
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
  async sendEmail(): Promise<{ message: string }> {
    // return this.taskModal.find({ userId: userId }).exec();
    const mail = {
      to: 'bilal.rafique@yopmail.com',
      subject: 'Password Reset Email',
      from: process.env.FROM_EMAIL,
      text: `Your password reset code is 3234. Please do not share this with anyone.`,
    };
    await this.emailService.sendEmail(mail);

    return {
      message: 'Password reset email has been sent successfully!',
    };
  }
}

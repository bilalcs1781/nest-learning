import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { createUserDto } from './dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}
  get() {
    return this.userModal.find();
  }
  create(createUserDto: createUserDto) {
    const newUser = new this.userModal(createUserDto);
    return newUser.save();
  }
  getOneUser(id: string) {
    return this.userModal.findById(id);
  }
  delete(id: string) {
    return this.userModal.findByIdAndDelete(id);
  }
}

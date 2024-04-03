import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { createUserDto } from './dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}
  get() {
    return this.userModal.find();
  }
  async create(createUserDto: createUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;
    const newUser = new this.userModal(createUserDto);

    return newUser.save();
  }
  getOneUser(id: string) {
    return this.userModal.findById(id);
  }
  findByEmail(email: string) {
    return this.userModal.findOne({ email });
  }
  delete(id: string) {
    return this.userModal.findByIdAndDelete(id);
  }
}

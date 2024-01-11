import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { createUserDto } from './dto/user-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.get();
  }
  @Post()
  store(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const findUser = await this.userService.getOneUser(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = this.userService.delete(id);
    return deletedUser;
  }
}

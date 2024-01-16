import { IsEmail, IsString } from 'class-validator';

export class createTaskDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @IsString()
  // userId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  @IsString()
  password: string;
}

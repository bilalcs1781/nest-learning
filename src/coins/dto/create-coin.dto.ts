import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoinDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsString()
  chain: string;

  // @IsString()
  // userId: string;
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const users = await this.userService.findByEmail(user.email);
    console.log(users);
    const payload = { email: users?.email, sub: users?._id };

    if (users) {
      const match = await bcrypt.compare(user.password, users.password);
      if (match)
        return {
          access_token: this.jwtService.sign(payload),
        };
      return 'Invalid Credentials!';
    }
    throw new UnauthorizedException();
  }
}

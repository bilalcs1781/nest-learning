import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiOperation({ summary: 'Login User' })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}

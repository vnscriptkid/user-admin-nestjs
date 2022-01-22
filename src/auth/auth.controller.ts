import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body) {
    return this.userService.create(body);
  }

  @Post()
  login(@Body() body) {
    return 'login';
  }
}

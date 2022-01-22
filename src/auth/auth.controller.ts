import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() body) {
    return 'register';
  }

  @Post()
  login(@Body() body) {
    return 'login';
  }
}

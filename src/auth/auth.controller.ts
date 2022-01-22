import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm)
      throw new BadRequestException('Passwords do not match.');

    return this.userService.create(body);
  }

  @Post()
  login(@Body() body) {
    return 'login';
  }
}

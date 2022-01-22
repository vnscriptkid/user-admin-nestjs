import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm)
      throw new BadRequestException('Passwords do not match.');

    return this.userService.create(body);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, jwtToken } = await this.authService.login(email, password);

    response.cookie('jwt', jwtToken, { httpOnly: true });

    return user;
  }
}

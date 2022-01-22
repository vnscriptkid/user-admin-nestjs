import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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
    @Res() response: Response,
  ) {
    const { user, jwtToken } = await this.authService.login(email, password);

    response.cookie('jwt', jwtToken, { httpOnly: true });

    return user;
  }

  @Get('me')
  async currentUser(@Req() request: Request) {
    const jwt = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(jwt);

    const user = await this.userService.findById(data.id);

    return user;
  }
}

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
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
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, jwtToken } = await this.authService.login(email, password);

    response.cookie('jwt', jwtToken, { httpOnly: true });

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async currentUser(@Req() request: Request) {
    const jwt = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(jwt);

    const user = await this.userService.findById(data.id);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return { message: 'success' };
  }
}

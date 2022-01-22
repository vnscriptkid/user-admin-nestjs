import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('Invalid credentials.');

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throw new BadRequestException('Invalid credentials.');

    const jwtToken = await this.jwtService.signAsync({ id: user.id });

    return { user, jwtToken };
  }
}

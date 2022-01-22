import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('Invalid credentials.');

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throw new BadRequestException('Invalid credentials.');

    return {
      user,
      token: 'xyz',
    };
  }
}

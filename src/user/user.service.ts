import { UpdateUserDto } from './dtos/update-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { RoleService } from 'src/role/role.service';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class UserService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {
    super(userRepository);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    let { password, email, ...otherProps } = updateUserDto;

    if (email && user.email !== email) {
      const otherUserWithThisEmail = this.findByEmail(email);

      if (otherUserWithThisEmail)
        throw new BadRequestException(`Email ${email} is already in use.`);
    }

    if (password) password = await bcrypt.hash(password, 12);

    Object.assign(user, {
      password,
      ...otherProps,
    });

    return await this.userRepository.save(user);
  }
}

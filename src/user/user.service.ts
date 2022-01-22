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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  all() {
    return this.userRepository.find();
  }

  async create(createUserDto: any) {
    const { first_name, last_name, email, password } = createUserDto;

    const hash = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  findById(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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

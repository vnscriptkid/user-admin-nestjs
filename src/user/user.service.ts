import { Injectable } from '@nestjs/common';
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
}

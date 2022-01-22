import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  all() {
    return this.userRepository.find();
  }

  create(createUserDto: any) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }
}

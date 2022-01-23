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
import { CreateUserDto } from './dtos/create-user.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  all() {
    return this.userRepository.find();
  }

  async paginate(pageNumber: number, pageSize: number) {
    const [users, total] = await this.userRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });

    return {
      data: users,
      meta: {
        currentPage: pageNumber,
        itemsPerPage: pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, password, role_id } = createUserDto;

    const role = await this.roleService.findById(role_id);

    if (!role) throw new BadRequestException(`Role #${role_id} not found.`);

    const hash = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hash,
      role,
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

  async delete(id: string) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException(`User #${id} not found.`);

    return this.userRepository.remove(user);
  }
}

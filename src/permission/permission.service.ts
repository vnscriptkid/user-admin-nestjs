import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  all() {
    return this.permissionRepository.find();
  }

  findByIds(ids: number[]) {
    return this.permissionRepository.findByIds(ids);
  }
}

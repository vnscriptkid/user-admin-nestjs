import { CreateRoleDto } from './dtos/create-role.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleRepository } from './role.repository';
import { PermissionService } from 'src/permission/permission.service';
import { FindOneOptions } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionService: PermissionService,
  ) {}

  all() {
    return this.roleRepository.find();
  }

  async create(createRoleDto: CreateRoleDto) {
    let { name, permissionIds } = createRoleDto;

    const permissions = await this.permissionService.findByIds(permissionIds);

    const role = this.roleRepository.create({ name, permissions });

    return this.roleRepository.save(role);
  }

  findById(id: number, opts?: FindOneOptions<Role>) {
    return this.roleRepository.findOne(id, opts);
  }

  findByName(name: string) {
    return this.roleRepository.findOne({ where: { name } });
  }

  async delete(id: number) {
    const role = await this.findById(id);

    if (!role) throw new NotFoundException(`Role #${id} not found.`);

    return this.roleRepository.remove(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findById(id);

    if (!role) throw new NotFoundException(`Role #${id} not found.`);

    Object.assign(role, updateRoleDto);

    return this.roleRepository.save(role);
  }
}

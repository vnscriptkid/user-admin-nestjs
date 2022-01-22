import { CreateRoleDto } from './dtos/create-role.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  all() {
    return this.roleRepository.find();
  }

  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);

    return this.roleRepository.save(role);
  }

  findById(id: number) {
    return this.roleRepository.findOne(id);
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

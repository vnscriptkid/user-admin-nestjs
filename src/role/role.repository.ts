import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from './models/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}

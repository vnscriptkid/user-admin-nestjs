import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class BaseService<T, R extends Repository<T>> {
  protected constructor(protected readonly repository: R) {}

  all() {
    return this.repository.find();
  }

  async paginate(pageNumber: number, pageSize: number, relations?: string[]) {
    const [list, total] = await this.repository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      relations,
    });

    return {
      data: list,
      meta: {
        currentPage: pageNumber,
        itemsPerPage: pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async create(data: DeepPartial<T>) {
    const record = this.repository.create(data);

    return this.repository.save(record);
  }

  findById(id: number, opts?: FindOneOptions<T>) {
    return this.repository.findOne(id, opts);
  }

  findByIds(ids: number[]) {
    return this.repository.findByIds(ids);
  }

  findOne(condition: FindConditions<T>, opts?: any) {
    return this.repository.findOne(condition, opts);
  }

  async update(id: number, data: DeepPartial<T>) {
    const record = await this.findById(id);

    if (!record) throw new NotFoundException(`Record #${id} not found.`);

    Object.assign(record, data);

    return this.repository.save(record);
  }

  async delete(id: number) {
    const record = await this.findById(id);

    if (!record) throw new NotFoundException(`Record #${id} not found.`);

    return this.repository.remove(record);
  }
}

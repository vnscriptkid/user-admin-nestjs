import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends BaseService<Order, Repository<Order>> {
  constructor(private readonly orderRepository: OrderRepository) {
    super(orderRepository);
  }

  getTotalPerDate() {
    return this.orderRepository.getTotalPerDate();
  }
}

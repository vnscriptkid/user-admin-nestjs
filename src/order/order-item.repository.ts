import { OrderItem } from './models/order-item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {}

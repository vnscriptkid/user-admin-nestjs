import { EntityRepository, Repository } from 'typeorm';
import { Order } from './models/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  getTotalPerDate(): Promise<{ date: string; sum: number }[]> {
    return this.query(`
        select DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.price * i.quantity) as sum
        from orders o
        join order_items i on o.id = i.order_id
        group by date;`);
  }
}

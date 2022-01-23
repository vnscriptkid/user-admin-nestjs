import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './order-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, OrderItemRepository])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

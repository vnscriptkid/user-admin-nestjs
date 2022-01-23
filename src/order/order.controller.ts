import { OrderService } from './order.service';
import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  all(@Query() { pageNumber, pageSize }: PaginationDto) {
    return this.orderService.paginate(pageNumber, pageSize, ['order_items']);
  }
}

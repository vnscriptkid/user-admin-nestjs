import { OrderService } from './order.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  all(@Query() { pageNumber, pageSize }: PaginationDto) {
    return this.orderService.paginate(pageNumber, pageSize, ['order_items']);
  }
}

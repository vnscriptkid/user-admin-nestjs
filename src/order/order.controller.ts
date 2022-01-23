import { OrderService } from './order.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Parser } from 'json2csv';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  all(@Query() { pageNumber, pageSize }: PaginationDto) {
    return this.orderService.paginate(pageNumber, pageSize, ['order_items']);
  }

  @Get('chart')
  async getChartData() {
    return this.orderService.getTotalPerDate();
  }

  @Post('export')
  async exportCsv(@Res() res: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.orderService.all({ relations: ['order_items'] });

    const json = [];

    orders.forEach((order) => {
      json.push({
        ID: order.id,
        Name: order.name,
        Email: order.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      order.order_items.forEach((item) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': item.product_title,
          Price: item.price,
          Quantity: item.quantity,
        });
      });
    });

    const csv = parser.parse(json);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');

    return res.send(csv);
  }
}

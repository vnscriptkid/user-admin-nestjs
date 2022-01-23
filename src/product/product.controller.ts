import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  all(@Query() { pageNumber, pageSize }: PaginationDto) {
    return this.productService.paginate(pageNumber, pageSize);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const product = await this.productService.findById(id);

    if (!product) throw new NotFoundException(`Product #${id} not found.`);

    return product;
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.productService.delete(id);
  }
}

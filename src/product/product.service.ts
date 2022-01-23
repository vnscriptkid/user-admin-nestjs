import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Product } from './models/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  public constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }
}

import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsOptional } from 'class-validator';

const MAX_PAGE_SIZE = 50;
const MIN_PAGE_SIZE = 1;
const DEFAULT_PAGE_SIZE = 2;

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  pageNumber: number = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ obj: { pageSize } }) => {
    let value = +pageSize;
    value = value > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : value;
    value = value < MIN_PAGE_SIZE ? MIN_PAGE_SIZE : value;
    return value;
  })
  pageSize: number = DEFAULT_PAGE_SIZE;
}

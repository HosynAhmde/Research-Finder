import type { Filter } from '@Common/interfaces';
import { Projection, Query } from '@Common/interfaces';
import { toPlain } from '@Common/utils';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1) // negative number not allowed to pass into limit
  @Transform(({ value }) => Math.min(Math.floor(value ?? 10), 100))
  limit: number;

  @IsNumber()
  @Min(0) // negative number not allowed to pass into skip
  @Transform(({ value, obj }) => {
    const limit = obj.limit ?? 10;
    return obj.page ? (obj.page - 1) * limit : Math.floor(value ?? 0);
  })
  skip: number;

  @IsOptional()
  @IsNumber()
  @Min(1) // negative number not allowed to pass into skip
  @Transform(({ value }) => Math.floor(value ?? 1))
  page: number;

  @IsOptional()
  @Transform(({ value }) => value ?? { createdAt: -1 })
  sort: Record<string, number>;
}

export class FilterDto<T = any> {
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  pagination: PaginationDto;

  @IsOptional()
  @IsString()
  projection: Projection<T>;

  @IsObject()
  query: Query<T>;

  toObject(query?: Query<T>): Filter<T> {
    return { ...toPlain(this), query: { ...this.query, ...query } };
  }
}

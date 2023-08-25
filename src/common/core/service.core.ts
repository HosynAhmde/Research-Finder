import { CountFilter, Filter, ItemsWithMetadata, OneFilter } from '@Common/interfaces';
import { Repository } from './repository.core';
import { type Document } from 'mongoose';
import { SearchService } from '@Components/search/search.service';
import { createPaginationMetadata } from '@Common/utils';

export class Service<Schema, CreateDto, UpdateDto> {
  constructor(protected readonly repository: Repository<Schema, CreateDto, UpdateDto>) {}

  count(filter: CountFilter<Document & Schema>): Promise<number> {
    return this.repository.count(filter);
  }

  create(createDto: CreateDto): Promise<Document & Schema> {
    return this.repository.create(createDto);
  }
  findOne(filter: OneFilter<Document & Schema>): Promise<Document & Schema> | null {
    return this.repository.findOne(filter);
  }

  async find(filter: Filter<Document & Schema, Schema>): Promise<ItemsWithMetadata<Document & Schema>> {
    const [count, items] = await Promise.all([this.count(filter), this.repository.find(filter)]);

    const metadata = createPaginationMetadata(count, filter.pagination.limit, filter.pagination.page);

    return { items, metadata };
  }

  findById(filter: OneFilter<Document & Schema>): Promise<Document & Schema> | null {
    return this.repository.findById(filter);
  }
  updateOne(filter: OneFilter<Document & Schema>, update: UpdateDto): Promise<Document & Schema> {
    return this.repository.updateOne(filter, update);
  }

  updateById(filter: OneFilter<Document & Schema>, update: UpdateDto): Promise<Document & Schema> {
    return this.repository.updateById(filter, update);
  }
  updateBulk(filter: CountFilter<Document & Schema>, update: UpdateDto): Promise<number> {
    return this.repository.updateBulk(filter, update);
  }

  deleteOne(filter: OneFilter<Document & Schema>, update?: UpdateDto): Promise<Document & Schema> {
    return this.repository.deleteOne(filter, update);
  }

  deleteById(filter: OneFilter<Document & Schema>, update?: UpdateDto): Promise<Document & Schema> {
    return this.repository.deleteById(filter, update);
  }

  destroyById(filter: OneFilter<Document & Schema>): Promise<Document & Schema> {
    return this.repository.findById(filter);
  }
}

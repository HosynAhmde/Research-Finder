import { CountFilter, Filter, OneFilter } from '@Common/interfaces';
import { Repository } from './repository.core';

export class Service<Schema, CreateDto, UpdateDto> {
  constructor(protected readonly repository: Repository<Schema, CreateDto, UpdateDto>) {}

  count(filter: CountFilter<Document & Schema>): Promise<number> {
    return this.repository.count(filter);
  }

  ctrate(createDto: CreateDto): Promise<Document & Schema> {
    return this.repository.create(createDto);
  }
  findOne(filter: OneFilter<Document & Schema>): Promise<Document & Schema> | null {
    return this.repository.findOne(filter);
  }

  find(filter: Filter<Document & Schema>): Promise<(Document & Schema)[]> {
    return this.repository.find(filter);
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

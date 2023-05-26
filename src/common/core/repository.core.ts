import { CountFilter, Filter, OneFilter } from '@Common/interfaces';
import { sanitizeQuery } from '@Common/utils/tool.util';
import { type Document, type Model } from 'mongoose';

export class Repository<Schema, CreateDto, UpdateDto> {
  constructor(protected readonly model: Model<Document & Schema>) {}

  count(filter: CountFilter<Document & Schema>): Promise<number> {
    return this.model.countDocuments(sanitizeQuery(filter.query)).exec();
  }

  create(createDto: CreateDto): Promise<Document & Schema> {
    return this.model.create({ ...createDto, created_at: new Date() });
  }
  findOne(filter: OneFilter<Document & Schema>): Promise<Document & Schema> | null {
    return this.model.findOne(sanitizeQuery(filter.query), filter.projection).exec();
  }
  find(filter: Filter<Document & Schema, Schema>): Promise<(Document & Schema)[]> {
    return this.model
      .find(sanitizeQuery(filter.query), filter.projection, {
        skip: filter.pagination?.skip,
        limit: filter.pagination?.limit,
        sort: filter.pagination?.sort,
      })
      .exec();
  }

  findById(filter: OneFilter<Document & Schema>): Promise<Document & Schema> | null {
    return this.model.findById(sanitizeQuery(filter.query.id), filter.projection).exec();
  }

  updateOne(filter: OneFilter<Document & Schema>, update: UpdateDto): Promise<Document & Schema> | null {
    return this.model
      .findOneAndUpdate(sanitizeQuery(filter.query), { ...update, updated_at: new Date() }, { new: true })
      .exec();
  }

  updateById(filter: OneFilter<Document & Schema>, update: UpdateDto): Promise<Document & Schema> | null {
    return this.model
      .findByIdAndUpdate(
        sanitizeQuery(filter.query.id),
        { ...update, updated_at: new Date() },
        { projection: filter.projection, new: true },
      )
      .exec();
  }

  async updateBulk(filter: OneFilter<Document & Schema>, update: UpdateDto): Promise<number> {
    return (
      await this.model
        .updateMany(sanitizeQuery(filter.query), { ...update, updated_at: new Date() }, { new: true })
        .exec()
    ).modifiedCount;
  }

  deleteOne(filter: OneFilter<Document & Schema>, update?: UpdateDto): Promise<Document & Schema> | null {
    return this.model
      .findOneAndUpdate(
        sanitizeQuery(filter.query),
        { ...update, deleted_at: new Date() },
        { projection: filter.projection },
      )
      .exec();
  }
  deleteById(filter: OneFilter<Document & Schema>, update?: UpdateDto): Promise<(Document & Schema) | null> {
    return this.model
      .findByIdAndUpdate(filter.query.id, { ...update, deleted_at: new Date() }, { projection: filter.projection })
      .exec();
  }

  destroyById(filter: OneFilter<Document & Schema>): Promise<(Document & Schema) | null> {
    return this.model.findByIdAndDelete(filter.query.id, { projection: filter.projection }).exec();
  }
}

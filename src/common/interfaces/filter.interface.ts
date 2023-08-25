import { type FilterQuery, type ProjectionFields, type SortOrder } from 'mongoose';

export type Query<T = any> = FilterQuery<T>;
export type Projection<T = any> = ProjectionFields<T>;

export interface Pagination<k = any> {
  skip: number;
  limit: number;
  page: number;
  sort: { [key in keyof k]: SortOrder | { $meta: 'textScore' } };
}

export interface Filter<T = any, K = T> {
  query?: Query<T>;
  projection?: Projection<T>;
  pagination?: Pagination<K>;
}

export interface Update<T = any, K = T> {
  update: T;
  filter: Filter<T, K>;
}

export type OneFilter<T = any> = Omit<Filter<T>, 'pagination'>;
export type CountFilter<T = any> = Omit<Filter<T>, 'pagination' | 'projection'>;

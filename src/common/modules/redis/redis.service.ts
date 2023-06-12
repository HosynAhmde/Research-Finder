import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export const REDIS_OPTION = Symbol('REDIS_OPTION');

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject(REDIS_OPTION) options: RedisOptions) {
    super(options);
  }
}

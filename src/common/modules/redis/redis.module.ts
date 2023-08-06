import { type DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { type RedisOptions } from 'ioredis';

import { REDIS_OPTIONS, RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static register(options: RedisOptions, global = false): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
      global,
    };
  }
}

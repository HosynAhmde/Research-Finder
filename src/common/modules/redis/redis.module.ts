import { DynamicModule, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import { RedisService } from '../redis';

@Module({})
export class RedisModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_OPTION',
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
      global: true,
    };
  }
}

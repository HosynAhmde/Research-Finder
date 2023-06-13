import { Global, Module } from '@nestjs/common';
import { RedisModule } from '../redis';
import { REDIS_OPTIONS } from '@Common/configs';
import { BlacklistedService } from './blacklisted.service';

@Global()
@Module({
  imports: [RedisModule.register(REDIS_OPTIONS())],
  providers: [BlacklistedService],
  exports: [BlacklistedService],
})
export class BlacklistedModule {}

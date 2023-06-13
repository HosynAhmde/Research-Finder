import { generateCacheKey } from '@Common/utils';
import { RedisService } from '../redis';
import { Injectable } from '@nestjs/common';

export const BLACKLISTED_PREFIX_KEY = 'blacklisted';

@Injectable()
export class BlacklistedService {
  constructor(private readonly redisService: RedisService) {}
  async isBlacklisted(...str: string[]): Promise<boolean> {
    const key = str.map(s => generateCacheKey(BLACKLISTED_PREFIX_KEY, s));
    return !!(await this.redisService.exists(...key));
  }
  public async blackList(token, expiresIn) {
    return await this.redisService.set(token, 'true', 'EX', expiresIn);
  }

  public async put(str: string, ttl: number): Promise<'OK'> {
    return await this.redisService.set(generateCacheKey(BLACKLISTED_PREFIX_KEY, str), 'true', 'EX', ttl);
  }

  public async delete(str: string): Promise<number> {
    return await this.redisService.del(generateCacheKey(BLACKLISTED_PREFIX_KEY, str));
  }
}

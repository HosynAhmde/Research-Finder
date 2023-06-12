import { RedisService } from '../redis';

export class blacklistedService {
  constructor(redisService: RedisService) {}
  async isBlackListed(token) {
    return await this.redisService.get(token);
  }
  async blackList(token, expiresIn) {
    return await this.redisService.set(token, 'true', 'EX', expiresIn);
  }
}

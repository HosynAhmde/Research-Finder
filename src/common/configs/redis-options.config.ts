import { RedisOptions } from 'ioredis';

export const REDIS_OPTIONS = (): RedisOptions => {
  const host = 'localhost';
  const port = 6379;
  // const password = '122333';

  return { port, host };
};

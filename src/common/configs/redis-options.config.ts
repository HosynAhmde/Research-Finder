import { RedisOptions } from 'ioredis';

export const REDIS_OPTIONS = (): RedisOptions => {
  const host = process.env.REDIS_HOST;
  const port = Number(process.env.REDIS_PORT);
  const password = process.env.REDIS_PASSWORD;

  return { port, host, password };
};

import { getEnv, toInteger } from '@fullstacksjs/toolbox';

export const APPLICATION_CONFIG = () => ({
  http: {
    host: getEnv('HOST', 'localhost'),
    port: toInteger(getEnv('PORT', '4000')),
  },
  globalPrefix: '/api',
  timezone: getEnv('Tz', 'Asia/tehran'),
});

import { Env } from '@fullstacksjs/toolbox';
export const AUTH_CONFIG = () => ({
  ACCESS_TOKEN: {
    secret: process.env.ACCESS_TOKEN_SECRET,

    expiration: process.env.ACCESS_TOKEN_EXPIRATION,
  },

  REFRESH_TOKEN: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiration: process.env.REFRESH_TOKEN_EXPIRATION,
  },

  COOKIE_OPTIONS: {
    httpOnly: Env.isProd,
    secure: Env.isProd,
    path: '/api/auth',
  },
});

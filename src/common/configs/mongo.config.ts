import { getEnv, getRequiredEnv } from '@fullstacksjs/toolbox';

export const MONGO_CONFIG = () => {
  const host = process.env.DATABASE_HOST;
  const database = process.env.DATABASE_NAME;
  const username = process.env.DATABASE_USERNAME;
  const password = process.env.DATABASE_PASSWORD;
  const query = 'authSource=admin';

  // eslint-disable-next-line fp/no-let
  let uri: string;

  if (username && password) {
    uri = `mongodb://${username}:${password}@${host}/${database}?${query}`;
  } else {
    uri = `mongodb://${host}/${database}?${query}`;
  }
  console.log(uri);

  return uri;
};

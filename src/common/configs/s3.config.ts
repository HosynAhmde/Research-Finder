import { S3Client } from '@aws-sdk/client-s3';
import type { AppRequest } from '@Common/modules';
import { ACL, Bucket } from '@Components/asset/enums';
import { AUTO_CONTENT_TYPE } from 'multer-s3';
import { extname } from 'path';
import { v4 } from 'uuid';

const generateKeyPrefix = ({ sub }: AppRequest['token']): string => sub;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function STORAGES_CONFIG() {
  const ssl = 'true';
  const host = 'localhost';
  const port = '9000';
  const accessKeyId = 'MINIO_ROOT_USER';
  const secretAccessKey = 'MINIO_ROOT_PASSWORD';
  const url = `http${ssl ? 's' : ''}://${host}${port ? `:${port}` : ''}`;
  const region = 'us-east-1';

  const s3 = new S3Client({
    apiVersion: 'v4',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
    endpoint: url,
    region,
  });

  const key = (
    request: AppRequest,
    file: Express.Multer.File,
    cb: (err: any, mime?: string, stream?: any) => void,
  ) => {
    const { token } = request;
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const prefix = generateKeyPrefix(token);
    const fileName = `${prefix}/${v4()}-${
      uniqueSuffix + extname(file.originalname)
    }`;
    cb(null, fileName);
  };

  return {
    region,
    CONFIG: { ssl, host, port, accessKeyId, secretAccessKey, url },
    PUBLIC_BUCKET: {
      s3,
      key,
      acl: ACL.PublicRead,
      contentType: AUTO_CONTENT_TYPE,
      bucket: Bucket.Public,
    },
    PRIVATE_BUCKET: {
      s3,
      key,
      acl: ACL.Private,
      contentType: AUTO_CONTENT_TYPE,
      bucket: Bucket.Private,
    },
  };
}

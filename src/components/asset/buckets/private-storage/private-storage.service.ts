import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { AssetRepository } from '@Components/asset/asset.repository';
import { PRIVATE_STORAGE_KEY } from '@Components/asset/constants';
import type { Asset, AssetDocument } from '@Components/asset/schema';
import { Inject, Injectable } from '@nestjs/common';
import type { Readable } from 'stream';

@Injectable()
export class PrivateStorageService {
  constructor(
    private readonly repository: AssetRepository,
    @Inject(PRIVATE_STORAGE_KEY) private readonly s3: S3Client,
  ) {}

  async create(assets: Asset[]): Promise<AssetDocument[]> {
    return Promise.all(assets.map(asset => this.repository.create(asset)));
  }

  async getObject(asset: Asset): Promise<Blob | Readable | ReadableStream> {
    const command = new GetObjectCommand({
      Bucket: asset.bucket,
      Key: asset.key,
    });

    return (await this.s3.send(command)).Body;
  }

  public async deleteObject(bucket: string, key: string) {
    const params = { Bucket: bucket, Key: key };
    const command = new DeleteObjectCommand(params);
    return this.s3.send(command);
  }
}

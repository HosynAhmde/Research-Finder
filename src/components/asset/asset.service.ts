import { Service } from '@Common/core';
import { Injectable, NotFoundException } from '@nestjs/common';

import { AssetRepository } from './asset.repository';
import { PrivateStorageService, PublicStorageService } from './buckets';
import type { CreateAssetDto, UpdateAssetDto } from './dto';
import { ACL } from './enums';
import type { Asset } from './schema';

@Injectable()
export class AssetService extends Service<
  Asset,
  CreateAssetDto,
  UpdateAssetDto
> {
  constructor(
    readonly repository: AssetRepository,
    private readonly privateStorageService: PrivateStorageService,
    private readonly publicStorageService: PublicStorageService,
  ) {
    super(repository);
  }

  public async downloadById(id: string) {
    const asset = await this.repository.findById({ query: { id } });

    if (!asset) throw new NotFoundException('asset.not_found');

    if (asset.acl === ACL.Private) {
      return { data: await this.privateStorageService.getObject(asset), asset };
    }

    return { data: await this.publicStorageService.getObject(asset), asset };
  }
}

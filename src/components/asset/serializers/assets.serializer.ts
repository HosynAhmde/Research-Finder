import { Exclude, Expose, Type } from 'class-transformer';

import type { AssetDocument } from '../schema';
import { AssetSerializer } from './asset.serializer';

@Exclude()
export class AssetsSerializer {
  @Expose()
  @Type(() => AssetSerializer)
  items: AssetSerializer[];

  static build({ items }: { items: AssetDocument[] }): AssetsSerializer {
    return new AssetsSerializer({
      items: items.map(item => AssetSerializer.build(item)),
    });
  }

  constructor(data?: AssetsSerializer) {
    if (data) Object.assign(this, data);
  }
}

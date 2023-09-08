import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import { type ArbitrationDocument,  } from '../schema';

import { ItemsWithMetadata, Metadata } from '@Common/interfaces';
import { ArbitrationSerializer } from './arbitration.serializer';

@Exclude()
export class ArbitrationsSerializer {
  @Expose()
  @Type(() => ArbitrationSerializer)
  items: ArbitrationSerializer[];

  @Expose()
  metadata: Metadata;
  static build({
    items,
    metadata,
  }: ItemsWithMetadata<ArbitrationDocument>): ArbitrationsSerializer {
    return new ArbitrationsSerializer({
      items: items.map(item => ArbitrationSerializer.build(item)),
      metadata,
    });
  }

  constructor(data?: ArbitrationsSerializer) {
    if (data) Object.assign(this, data);
  }
}

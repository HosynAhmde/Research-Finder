import { Serializer } from '@Common/serializers';
import { Exclude } from '@nestjs/class-transformer';

@Exclude()
export class SearchSerializer extends Serializer<SearchSerializer> {}

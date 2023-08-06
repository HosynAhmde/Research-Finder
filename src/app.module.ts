import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONFIG } from '@Common/configs/mongo.config';
import { ConfigModule } from '@nestjs/config';
import { ComponentsModule } from '@Components/components.module';
import { BlacklistedModule, RequestModule } from '@Common/modules';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from '@Components/search/search.module';
import { RedisModule } from '@Common/modules/redis';
import { REDIS_OPTIONS } from '@Common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_CONFIG()),
    RedisModule.register(REDIS_OPTIONS(), true),
    RequestModule,
    ComponentsModule,
    BlacklistedModule,
  ],
})
export class AppModule {}

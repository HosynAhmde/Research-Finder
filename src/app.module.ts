import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONFIG } from '@Common/configs/mongo.config';
import { ConfigModule } from '@nestjs/config';
import { ComponentsModule } from '@Components/components.module';
import { RequestModule } from '@Common/modules';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from '@Components/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_CONFIG()),
    RequestModule,
    ComponentsModule,
  ],
})
export class AppModule {}

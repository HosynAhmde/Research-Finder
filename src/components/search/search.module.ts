import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.register({
      useFactory: async (configService: ConfigService) => ({
        import: [ConfigServices],
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get<string>('ELASTICSEARCH_USERNAME'),
          password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
        },
      }),
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

import { Module, OnModuleInit } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),

        auth: {
          username: process.env.ELASTICSEARCH_USERNAME,
          password: process.env.ELASTICSEARCH_PASSWORD,
        },
        maxRetries: 10,
        requestTimeout: 60000,

        tls: {
          rejectUnauthorized: false,
        },
      }),

      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule, SearchService],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}

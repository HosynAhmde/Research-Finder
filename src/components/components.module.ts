import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth';
import { JwtModule } from '@nestjs/jwt';

import { ArbitrationModule } from './arbitration/arbitration.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ArticleModule,
    SearchModule,
    AuthModule,
    ArbitrationModule
  ],
})
export class ComponentsModule {}

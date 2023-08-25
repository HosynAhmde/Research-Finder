import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ArticleModule,
    SearchModule,
    AuthModule,
  ],
})
export class ComponentsModule {}

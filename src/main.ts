import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_CONFIG, MONGO_CONFIG } from '@Common/configs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = APPLICATION_CONFIG();
  const mongoCongig = MONGO_CONFIG();
  const logger = new Logger();
  await app.listen(appConfig.http.port);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

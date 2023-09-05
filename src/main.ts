import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from '@Common/configs';
import { Logger } from '@nestjs/common';
import { swaggerBootstrap } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = APPLICATION_CONFIG();
  // app.setGlobalPrefix(appConfig.globalPrefix);
  const logger = new Logger();
  swaggerBootstrap(app);

  await app.listen(appConfig.http.port);

  logger.log(`App Timezone is ${appConfig.timezone}`, 'NestApplication');

  logger.log(`Server running on ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();

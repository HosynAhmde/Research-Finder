import { SWAGGER_CONFIG } from '@Common/configs';
import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerBootstrap(app: INestApplication) {
  const swaggerConfig = SWAGGER_CONFIG();

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.name)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.currentVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConfig.path, app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}

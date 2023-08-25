import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
          skipNullProperties: false,
          skipMissingProperties: false,
          skipUndefinedProperties: false,
          validateCustomDecorators: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    },
  ],
})
export class RequestModule {}

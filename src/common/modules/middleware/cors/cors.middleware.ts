import { MIDDLEWARE_CONFIG } from '@Common/configs';
import type { NestMiddleware } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const corsConfig = MIDDLEWARE_CONFIG().cors;

    const allowOrigin = corsConfig.allowOrigin;

    const corsOptions: CorsOptions = {
      origin: allowOrigin,
      methods: corsConfig.allowMethod,
      allowedHeaders: corsConfig.allowHeader,
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };

    cors(corsOptions)(req, res, next);
  }
}

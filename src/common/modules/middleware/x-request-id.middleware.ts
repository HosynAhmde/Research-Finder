import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { v4 } from 'uuid';

import type { AppRequest } from '../request';

@Injectable()
export class XRequestIdMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id'] ?? v4();

    req.headers['x-request-id'] = requestId;
    res.setHeader('x-request-id', requestId);

    next();
  }
}

import { Service } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { Session } from './schema';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService extends Service<Session, any, any> {
  constructor(readonly repository: SessionRepository) {
    super(repository);
  }
}

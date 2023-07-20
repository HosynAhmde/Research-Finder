import { Injectable } from '@nestjs/common';
import { Session, type SessionDocument } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '@Common/core';
import { Model } from 'mongoose';

@Injectable()
export class SessionRepository extends Repository<Session, any, any> {
  constructor(@InjectModel(Session.name) readonly repository: Model<SessionDocument>) {
    super(repository);
  }
}

import { Repository } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { type CreateUserDto, type UpdateUserDto } from './dto';
import { User, type UserDocument } from './schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends Repository<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}

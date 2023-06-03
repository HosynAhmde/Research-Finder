import { Service } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { User } from './schema';
import { type CreateUserDto, type UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends Service<User, CreateUserDto, UpdateUserDto> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }
}

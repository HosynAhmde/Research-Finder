import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserSerializer } from './serializer/user.serializer';
import { SetOwnerInterceptor } from '@Common/interceptors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(SetOwnerInterceptor)
  async create(@Body() dto: CreateUserDto) {
    return UserSerializer.build(await this.userService.create(dto));
  }
}

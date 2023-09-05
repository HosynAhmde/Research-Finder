import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserSerializer } from './serializer/user.serializer';
import { SetOwnerInterceptor } from '@Common/interceptors';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @UseInterceptors(SetOwnerInterceptor)
  async create(@Body() dto: CreateUserDto) {
    return UserSerializer.build(await this.userService.create(dto));
  }
}

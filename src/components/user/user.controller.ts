import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserSerializer } from './serializer/user.serializer';
import { AuthorityInterceptor, QueryStringParserInterceptor, SetOwnerInterceptor, SetUpdatedByOwnerInterceptor } from '@Common/interceptors';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard, PolicyGuard } from '@Common/guards';
import { SetPolicy, SetResource } from '@Common/metadata';
import { Action, Resource } from '@Common/enum';
import { Field, Filter } from '@Common/decorators';
import { FilterDto } from '@Common/dto';
import { UsersSerializer } from './serializer/users.serializer';
import { ParseObjectIdPipe } from '@Common/pipes';
import { Arbitration } from '@Components/arbitration/schema';
import { ArbitrationSerializer } from '@Components/arbitration/serializers';
import { User } from './schema';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@SetResource(Resource.User)
@UseGuards(AuthGuard, PolicyGuard)
@UseInterceptors(QueryStringParserInterceptor, ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @SetPolicy(Action.Create)
  @UseInterceptors(SetOwnerInterceptor)
  async create(@Body() dto: CreateUserDto) {
    return UserSerializer.build(await this.userService.create(dto));
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor)
  async findAll(@Filter() filter: FilterDto) {
    return UsersSerializer.build(await this.userService.find(filter.toObject()));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @SetPolicy(Action.Update)
  @UseInterceptors(AuthorityInterceptor,SetUpdatedByOwnerInterceptor)
  async update(
  @Param('id', ParseObjectIdPipe) id: string,
  @Filter() filter: FilterDto<User>,
  @Field() dto: UpdateUserDto) {
    return UserSerializer.build(await this.userService.updateOne(filter.toObject({ id }), dto));
  }


}

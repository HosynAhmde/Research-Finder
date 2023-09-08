import { UpdateDto } from '@Common/dto';
import { Role } from '@Common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends UpdateDto<UpdateUserDto> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
@IsOptional()

  password: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  roles?: [Role];
}

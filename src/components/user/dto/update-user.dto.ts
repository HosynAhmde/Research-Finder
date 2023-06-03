import { UpdateDto } from '@Common/dto';
import { Role } from '@Common/enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends UpdateDto<UpdateUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}

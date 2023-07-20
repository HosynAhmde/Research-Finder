import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { AuthSerializer } from './serializers/auth.serializer';
import { RefreshGuard } from '@Common/guards';
import { ClearCookie, SetRefreshTokenInterceptor } from './interceptors';
import { RefreshToken } from './decorators';
import { AppRequest } from '@Common/modules';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<boolean> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthSerializer> {
    return AuthSerializer.build(await this.authService.login(loginDto));
  }

  @Post('logout')
  @UseGuards(RefreshGuard)
  @UseInterceptors(ClearCookie())
  @HttpCode(HttpStatus.OK)
  async logout(@RefreshToken() refreshToken: AppRequest['refreshToken']) {
    return this.authService.logout(refreshToken);
  }

  @Post('refresh-token')
  @UseGuards(RefreshGuard)
  @UseInterceptors(SetRefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@RefreshToken() refreshToken: AppRequest['refreshToken']): Promise<AuthSerializer> {
    return AuthSerializer.build(await this.authService.refreshToken(refreshToken));
  }
}

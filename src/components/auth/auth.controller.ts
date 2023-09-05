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
import { JwtToken } from './interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<boolean> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthSerializer> {
    return AuthSerializer.build(await this.authService.login(loginDto));
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @UseGuards(RefreshGuard)
  @UseInterceptors(ClearCookie())
  @HttpCode(HttpStatus.OK)
  async logout(@RefreshToken() refreshToken: JwtToken): Promise<boolean> {
    return this.authService.logout(refreshToken);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(RefreshGuard)
  @UseInterceptors(SetRefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @RefreshToken() refreshToken: JwtToken,
  ): Promise<AuthSerializer> {
    return AuthSerializer.build(
      await this.authService.refreshToken(refreshToken),
    );
  }
}

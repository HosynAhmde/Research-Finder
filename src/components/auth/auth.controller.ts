import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { promises } from 'dns';
import { AuthSerializer } from './serializer/auth.serializer';

@Controller('auth')
export class Auhtcontroller {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  // @Post('login')
  // async login(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto);
  // }

  // @Post('logout')
  // async logout(@Body() logoutDto: LogoutDto) {
  //   return this.authService.logout(logoutDto);
  // }

  // @Post('refreshtoken')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto);
  // }
}

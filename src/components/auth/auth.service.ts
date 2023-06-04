import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    const { email, password: nonHashPassword } = registerDto;
    
  }
  async login(loginDto: LoginDto) {}
  async logout(logoutDto: LogoutDto) {}
  async refreshToken(refreshTokenDto: RefreshTokenDto) {}
}

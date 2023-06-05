import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { UserService } from '@Components/user/user.service';
import { Bcrypt } from '@Common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerDto: RegisterDto) {
    const { email, password: nonHashPassword } = registerDto;

    const user = await this.userService.findOne({ query: { email } });

    if (user) throw new BadRequestException('AUTH.EMALI_IS_ALREADY_IN_USE');

    const password = await Bcrypt.hash(nonHashPassword);
  }
  // async login(loginDto: LoginDto) {}
  // async logout(logoutDto: LogoutDto) {}
  // async refreshToken(refreshTokenDto: RefreshTokenDto) {}
}

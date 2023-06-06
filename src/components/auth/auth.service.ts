import { BadRequestException, Injectable } from '@nestjs/common';
import { type RegisterDto } from './dto';
import { UserService } from '@Components/user/user.service';
import { Bcrypt, Md5 } from '@Common/helpers';
import { type UserDocument } from '@Components/user/schema';
import { Role } from '@Common/enum';
import { type SessionDocument } from './schema';
import { JwtToken } from './interface';
import { SessionService } from './session.service';

import { AES } from '@Common/helpers/aes.helper';
import { JwtService } from '@nestjs/jwt';
import { AUTH_CONGIG } from '@Common/configs';
import { log } from 'console';
import { getEnv } from '@fullstacksjs/toolbox';

const { ACCESS_TOKEN, REFRESH_TOKEN } = AUTH_CONGIG();
console.log(getEnv('ACCESS_TOKEN_SECRET'));

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password: nonHashPassword } = registerDto;

    const user = await this.userService.findOne({ query: { email } });

    if (user) throw new BadRequestException('AUTH.EMALI_IS_ALREADY_IN_USE');

    const password = await Bcrypt.hash(nonHashPassword);

    const newUser = await this.userService.create(registerDto);
    console.log(newUser);

    return this.generateUserResponse(newUser);
  }
  // async login(loginDto: LoginDto) {}
  // async logout(logoutDto: LogoutDto) {}
  // async refreshToken(refreshTokenDto: RefreshTokenDto) {}

  private async generateUserResponse(user: UserDocument) {
    const cachedToken = await this.setCachToken(user._id, { roles: user.roles });

    return {
      ...this.createToken(cachedToken.payload),
      user,
    };
  }

  protected async setCachToken(
    userId: string,
    meta: { roles: Role[]; session?: SessionDocument; cold?: boolean },
  ): Promise<{ payload: JwtToken }> {
    let session: SessionDocument;

    if (!meta.session) {
      session = await this.sessionService.create({ created_by: userId });
    } else session = meta.session;

    const payload: JwtToken = {
      session: session.id.toString(),
      sub: userId,
      roles: meta.roles,
    };

    return { payload };
  }

  protected createToken(payload: JwtToken) {
    return {
      access_token: AES.encrypt(
        this.jwtService.sign(payload, { secret: ACCESS_TOKEN.secret, expiresIn: ACCESS_TOKEN.expiration }),
      ),
      refresh_token: AES.encrypt(
        this.jwtService.sign(payload, { secret: REFRESH_TOKEN.secret, expiresIn: REFRESH_TOKEN.expiration }),
      ),
    };
  }
}

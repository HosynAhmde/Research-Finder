import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, type RegisterDto } from './dto';
import { UserService } from '@Components/user/user.service';
import { Bcrypt } from '@Common/helpers';
import { type UserDocument } from '@Components/user/schema';
import { Role } from '@Common/enum';
import { type SessionDocument } from './schema';
import { JwtToken } from './interface';
import { SessionService } from './session.service';
import { AES, Time } from '@Common/helpers';
import { JwtService } from '@nestjs/jwt';
import { AUTH_CONFIG } from '@Common/configs';
import { BlacklistedService } from '@Common/modules/blacklisted';

const { ACCESS_TOKEN, REFRESH_TOKEN } = AUTH_CONFIG();
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly blacklistedService: BlacklistedService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password: nonHashPassword } = registerDto;

    const user = await this.userService.findOne({ query: { email } });

    if (user) throw new BadRequestException('AUTH.EMAIL_IS_ALREADY_IN_USE');

    const password = await Bcrypt.hash(nonHashPassword);

    await this.userService.create({ email, password });

    return true;
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findOne({ query: { email } });

    if (!user) throw new BadRequestException('AUTH.USER_NOT_FOUND');

    const isPasswordValid = await Bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new BadRequestException('AUTH.INVALID_PASSWORD');

    return this.generateUserResponse(user);
  }

  async refreshToken(refreshToken: JwtToken) {
    const session = await this.sessionService.findById({
      query: { id: refreshToken.session },
    });

    if (!session) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    const user = await this.userService.findOne({
      query: { id: refreshToken.sub },
    });

    if (!user) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    return this.generateUserResponse(user);
  }

  async logout(refreshToken: JwtToken): Promise<boolean> {
    try {
      await this.blacklistedService.put(
        refreshToken.session,
        Time.remainedTime(refreshToken.exp!),
      );
      return true;
    } catch (err) {
      return false;
    }
  }
  private async generateUserResponse(user: UserDocument) {
    const cachedToken = await this.setCacheToken(user._id, {
      roles: user.roles,
    });

    return {
      ...this.createToken(cachedToken.payload),
      user,
    };
  }

  protected async setCacheToken(
    userId: string,
    meta: { roles: Role[]; session?: SessionDocument },
  ): Promise<{ payload: JwtToken }> {
    let session: SessionDocument;

    if (!meta.session) {
      session = await this.sessionService.create({ createdBy: userId });
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
      accessToken: AES.encrypt(
        this.jwtService.sign(payload, {
          secret: ACCESS_TOKEN.secret,
          expiresIn: ACCESS_TOKEN.expiration,
        }),
      ),
      refreshToken: AES.encrypt(
        this.jwtService.sign(payload, {
          secret: REFRESH_TOKEN.secret,
          expiresIn: REFRESH_TOKEN.expiration,
        }),
      ),
    };
  }
}

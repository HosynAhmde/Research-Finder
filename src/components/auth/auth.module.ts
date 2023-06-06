import { Module } from '@nestjs/common';
import { Session, SessionSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@Components/user/user.module';
import { Auhtcontroller } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionRepository } from './sesseion.repository';
import { SessionService } from './session.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]), JwtModule, UserModule],
  controllers: [Auhtcontroller],
  providers: [AuthService, SessionRepository, SessionService],
})
export class AuthModule {}

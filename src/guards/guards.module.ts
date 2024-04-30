import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GuardService } from './guards.service';
import { BasicStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { CONSTANT } from 'src/common/constant';
import { HttpResponse } from 'src/common/httpResponse';
import { JwtStrategy } from './jwt.strategy';
import { UserDocument, UserSchema } from 'src/model/user.schema';
import { DatabaseModule } from 'src/providers/database';
import { membershipService } from 'src/modules/client/on-boarding/membership.service';
import { MemberShipModule } from 'src/modules/client/on-boarding/membership.module';


@Module({
  imports: [
    JwtModule.register({
      secret: CONSTANT.JWT_PASSWORD,
    }),
    PassportModule,DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [GuardService, JwtStrategy, HttpResponse, BasicStrategy,MemberShipModule,UserDocument],
  exports: [JwtModule],
})
export class GuardModule {}

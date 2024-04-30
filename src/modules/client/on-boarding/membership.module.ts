import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { MemberShipController } from './membership.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/providers/database';
import { membershipService } from './membership.service.js';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MemberShipController],
  providers: [membershipService],
})
export class MemberShipModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// controller
import { AuthController } from './auth.controller';
import { WellKnownController } from './wellknown.controller';

// service
import { AuthService } from './auth.service';
import { ConfigService } from '../../config/config.service';

// module
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../../config/config.module';
import { RolesModule } from '../roles/roles.module';

// strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [AuthController, WellKnownController],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy],
  imports: [
    ConfigModule,
    UsersModule,
    RolesModule,
    PassportModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const defaultStrategy = await configService.defaultStrategy();
        return {
          defaultStrategy
        };
      },
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const { jwtExpireIn, jwtSecretKey } = await configService.jwtConfig();
        return {
          secret: jwtSecretKey,
          signOptions: { expiresIn: jwtExpireIn }
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {}

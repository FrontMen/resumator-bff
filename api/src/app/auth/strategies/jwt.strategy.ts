import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// entities
import { User } from '../../users/entity/user.entity';

// services
import { UsersService } from '../../users/users.service';

interface ValidateUserInterface {
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  async validate({ email }: ValidateUserInterface): Promise<User> {
    return this.userService.findUserByEmail(email);
  }
}

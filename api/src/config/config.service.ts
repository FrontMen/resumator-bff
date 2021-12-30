import { Injectable } from '@nestjs/common';

interface JwtConfig {
  jwtSecretKey: string;
  jwtExpireIn: string;
}

@Injectable()
export class ConfigService {
  async mongoConfig() {
    return {
      uri: process.env.DB_URL
    };
  }

  async defaultStrategy(): Promise<string> {
    return 'jwt';
  }

  async jwtConfig(): Promise<JwtConfig> {
    return {
      jwtSecretKey: process.env.JWT_SECRET_KEY,
      jwtExpireIn: process.env.JWT_EXPIRES_IN
    };
  }
}

import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from './config.service';

dotenv.config();
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}

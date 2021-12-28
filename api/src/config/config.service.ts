import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  async mongoConfig() {
    return {
      uri: process.env.DB_URL
    }
  }
}

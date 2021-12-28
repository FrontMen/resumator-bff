import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// module
import { ConfigModule } from './config/config.module'

// controller
import { AppController } from './app.controller'

// service
import { AppService } from './app.service'
import { ConfigService } from './config/config.service'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const { uri } = await configService.mongoConfig()
        return {
          uri
        }
      },
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}

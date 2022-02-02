import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// module
import { ConfigModule } from './config/config.module';

// service
import { ConfigService } from './config/config.service';
import { UsersModule } from './app/users/users.module';
import { RolesModule } from './app/roles/roles.module';
import { AuthModule } from './app/auth/auth.module';
import { SkillsModule } from './app/skills/skills.module';
import { ResumesModule } from './app/resumes/resumes.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const { uri } = await configService.mongoConfig();
        return {
          uri
        };
      },
      inject: [ConfigService]
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SkillsModule,
    ResumesModule
  ]
})
export class AppModule {}

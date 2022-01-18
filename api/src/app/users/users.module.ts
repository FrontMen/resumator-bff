import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// entity
import { User, UserEntity } from './entity/user.entity';

// controller
import { UsersController } from './users.controller';

// service
import { UsersService } from './users.service';

// module
import { ResumesModule } from '../resumes/resumes.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RolesModule,
    ResumesModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }])
  ],
  exports: [UsersService]
})
export class UsersModule {}

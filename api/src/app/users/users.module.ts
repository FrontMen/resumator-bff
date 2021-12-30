import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// entity
import { User, UserEntity } from './entity/user.entity';

// controller
import { UsersController } from './users.controller';

// service
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }])
  ],
  exports: [UsersService]
})
export class UsersModule {}

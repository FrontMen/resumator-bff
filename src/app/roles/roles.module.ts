import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// service
import { RolesService } from './roles.service';

// controller
import { RolesController } from './roles.controller';

// entity
import { RoleEntity, Role } from './entity/role.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleEntity }])
  ],
  exports: [RolesService]
})
export class RolesModule {}

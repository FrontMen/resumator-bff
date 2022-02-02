import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// service
import { SkillsService } from './skills.service';

// controller
import { SkillsController } from './skills.controller';

// entity
import { Skill, SkillEntity } from './entity/skill.entity';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillEntity }])
  ]
})
export class SkillsModule {}

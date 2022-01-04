import { OmitType } from '@nestjs/swagger';

// entity
import { Skill } from '../entity/skill.entity';

export class CreateSkillDto extends OmitType(Skill, [
  'id',
  'createdAt',
  'updatedAt'
]) {}

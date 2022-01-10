import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

// decorators
import { Base, BaseSchema } from '../../../decorators';

// entity
import { Role } from '../../roles/entity/role.entity';
import { IsOptional } from 'class-validator';
import { Resume } from '../../resumes/entity/resume.entity';
import { Skill } from '../../skills/entity/skill.entity';

export type UserDocument = User & Document;

export class UserSkill {
  @Prop({ required: true, unique: true, ref: Skill.name })
  skillId: Skill;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

@BaseSchema()
export class User extends Base {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  @IsOptional()
  password: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Role.name
  })
  role: Role | string;

  @Prop({
    default: {},
    type: SchemaTypes.ObjectId,
    ref: Resume.name
  })
  resume?: Resume;

  @Prop({
    default: []
  })
  skills?: UserSkill[];

  @Prop({ required: false, default: false })
  deactivated: boolean;
}

export const UserEntity = SchemaFactory.createForClass(User);

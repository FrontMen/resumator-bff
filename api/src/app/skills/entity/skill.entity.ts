import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// decorators
import { Base, BaseSchema } from '../../../decorators';

export type SkillDocument = Skill & Document;

// TODO: validate skill name
@BaseSchema()
export class Skill extends Base {
  @Prop({ required: true, unique: true })
  name: string;
}

export const SkillEntity = SchemaFactory.createForClass(Skill);

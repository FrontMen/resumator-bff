import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsBoolean,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

// decorators
import { Base, BaseSchema } from '../../../decorators';

// entity
import {
  Education,
  SideProject,
  SocialLink,
  Stack,
  Publication,
  Experience
} from './resume-nested.entity';

export type ResumeDocument = Resume & Document;

@BaseSchema()
export class Resume extends Base {
  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => Education)
  education: Education[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => Experience)
  experience: Experience[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => Experience)
  projects: Experience[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => Stack)
  skills: Stack[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => Publication)
  publications: Publication[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => SideProject)
  sideProjects: SideProject[];

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => SocialLink)
  socialLinks: SocialLink[];

  @Prop({ required: false })
  @MinLength(20)
  @MaxLength(300)
  introduction: string;

  @Prop({ required: false })
  @IsBoolean()
  isImport: boolean;
}

export const ResumeEntity = SchemaFactory.createForClass(Resume);

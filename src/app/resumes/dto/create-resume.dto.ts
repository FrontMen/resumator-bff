import { Resume } from '../entity/resume.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateResumeDto extends OmitType(Resume, [
  'id',
  'createdAt',
  'updatedAt'
]) {}

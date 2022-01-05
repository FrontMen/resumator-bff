import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// service
import { ResumesService } from './resumes.service';

// controller
import { ResumesController } from './resumes.controller';

// entity
import { Resume, ResumeEntity } from './entity/resume.entity';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeEntity }])
  ],
  exports: [ResumesService]
})
export class ResumesModule {}

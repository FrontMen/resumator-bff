import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

// dto
import { EducationDto, CreateResumeDto } from './dto';

// service
import { ResumesService } from './resumes.service';

// entity
import { Resume } from './entity/resume.entity';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';

@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Get()
  async getAll(): Promise<Resume[]> {
    return this.resumesService.getAll();
  }

  @Post()
  async create(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumesService.create(createResumeDto);
  }

  @Post('/:resumeId/education')
  async addEducation(
    @Param('resumeId') resumeId: string,
    @Body() addEducationDto: EducationDto
  ): Promise<Resume> {
    return this.resumesService.addEducation(resumeId, addEducationDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one education details'
  })
  @Patch('/education/:id')
  async updateEducation(
    @Param('id') id: string,
    @Body() updateEducationDto: EducationDto
  ): Promise<Resume> {
    return this.resumesService.updateEducation(id, updateEducationDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update educations with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [EducationDto],
    content: {}
  })
  @Patch('/:resumeId/education')
  async updateEducations(
    @Param('resumeId') resumeId: string,
    @Body() updateEducationDto: EducationDto[]
  ): Promise<Resume> {
    return this.resumesService.updateEducations(resumeId, updateEducationDto);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateResumeDto: CreateResumeDto
  ) {
    return this.resumesService.updateOne(id, updateResumeDto);
  }

  @Delete('/education/:id')
  async deleteEducation(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteEducation(id);
  }
}

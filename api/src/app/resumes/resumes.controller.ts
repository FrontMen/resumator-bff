import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { Request } from 'express';

// dto
import { EducationDto, CreateResumeDto, ProjectDto } from './dto';

// service
import { ResumesService } from './resumes.service';

// entity
import { Resume } from './entity/resume.entity';
import { ExperienceDto } from './dto/experience.dto';
import { getWordFromEndpoint } from '../../utils';

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

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateResumeDto: CreateResumeDto
  ) {
    return this.resumesService.updateOne(id, updateResumeDto);
  }

  // EDUCATION PART
  @Post('/:resumeId/education')
  async addEducation(
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() addEducationDto: EducationDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.addEducation(
      resumeId,
      endpoint,
      addEducationDto
    );
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one education details'
  })
  @Patch('/education/:id')
  async updateEducation(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateEducationDto: EducationDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.updateEducation(
      id,
      endpoint,
      updateEducationDto
    );
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
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() updateEducationDto: EducationDto[]
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.updateEducations(
      resumeId,
      endpoint,
      updateEducationDto
    );
  }

  @Delete('/education/:id')
  async deleteEducation(
    @Req() request: Request,
    @Param('id') id: string
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.deleteEducation(id, endpoint);
  }

  // EXPERIENCE PART
  @Post('/:resumeId/experience')
  async addExperience(
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() addExperienceDto: ExperienceDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.addExperience(
      resumeId,
      endpoint,
      addExperienceDto
    );
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one experience details'
  })
  @Patch('/experience/:id')
  async updateExperience(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateExperienceDto: ExperienceDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.updateExperience(
      id,
      endpoint,
      updateExperienceDto
    );
  }

  @ApiOperation({
    summary: 'Use this endpoint for update experiences with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [ExperienceDto],
    content: {}
  })
  @Patch('/:resumeId/experience')
  async updateExperiences(
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() updateExperienceDto: ExperienceDto[]
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.updateExperiences(
      resumeId,
      endpoint,
      updateExperienceDto
    );
  }

  @Delete('/experience/:id')
  async deleteExperience(
    @Req() request: Request,
    @Param('id') id: string
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.deleteExperience(id, endpoint);
  }

  // PROJECTS PART
  @Post('/:resumeId/projects')
  async addProject(
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() addProjectDto: ProjectDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.addProject(resumeId, endpoint, addProjectDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one experience details'
  })
  @Patch('/projects/:id')
  async updateProject(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateProjectDto: ProjectDto
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.updateProject(id, endpoint, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update projects with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [ExperienceDto],
    content: {}
  })
  @Patch('/:resumeId/projects')
  async updateProjects(
    @Req() request: Request,
    @Param('resumeId') resumeId: string,
    @Body() updateProjectDto: ProjectDto[]
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 2);
    return this.resumesService.updateProjects(
      resumeId,
      endpoint,
      updateProjectDto
    );
  }

  @Delete('/projects/:id')
  async deleteProject(
    @Req() request: Request,
    @Param('id') id: string
  ): Promise<Resume> {
    const endpoint = getWordFromEndpoint(request.route.path, 1);
    return this.resumesService.deleteProject(id, endpoint);
  }
}

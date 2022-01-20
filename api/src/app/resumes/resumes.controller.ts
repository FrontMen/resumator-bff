import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';

// dto
import {
  EducationDto,
  CreateResumeDto,
  ProjectDto,
  ExperienceDto,
  PublicationDto
} from './dto';

// service
import { ResumesService } from './resumes.service';

// entity
import { Resume } from './entity/resume.entity';
import { SideProjectsDto } from './dto/side-projects.dto';
import { SocialLinksDto } from './dto/social-links.dto';
import { SkillDto } from './dto/skill.dto';

// TODO: change PATCH to PUT if we want to change array
@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Get()
  async getAll(): Promise<Resume[]> {
    return this.resumesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.findOneResume(id);
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

  @Delete('/education/:id')
  async deleteEducation(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteEducation(id);
  }

  // EXPERIENCE PART
  @Post('/:resumeId/experience')
  async addExperience(
    @Param('resumeId') resumeId: string,
    @Body() addExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.resumesService.addExperience(resumeId, addExperienceDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one experience details'
  })
  @Patch('/experience/:id')
  async updateExperience(
    @Param('id') id: string,
    @Body() updateExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.resumesService.updateExperience(id, updateExperienceDto);
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
    @Param('resumeId') resumeId: string,
    @Body() updateExperienceDto: ExperienceDto[]
  ): Promise<Resume> {
    return this.resumesService.updateExperiences(resumeId, updateExperienceDto);
  }

  @Delete('/experience/:id')
  async deleteExperience(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteExperience(id);
  }

  // PROJECTS PART
  @Post('/:resumeId/projects')
  async addProject(
    @Param('resumeId') resumeId: string,
    @Body() addProjectDto: ProjectDto
  ): Promise<Resume> {
    return this.resumesService.addProject(resumeId, addProjectDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one experience details'
  })
  @Patch('/projects/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: ProjectDto
  ): Promise<Resume> {
    return this.resumesService.updateProject(id, updateProjectDto);
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
    @Param('resumeId') resumeId: string,
    @Body() updateProjectDto: ProjectDto[]
  ): Promise<Resume> {
    return this.resumesService.updateProjects(resumeId, updateProjectDto);
  }

  @Delete('/projects/:id')
  async deleteProject(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteProject(id);
  }

  // PUBLICATIONS PART
  @Post('/:resumeId/publications')
  async addPublication(
    @Param('resumeId') resumeId: string,
    @Body() addPublicationDto: PublicationDto
  ): Promise<Resume> {
    return this.resumesService.addPublication(resumeId, addPublicationDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one publication details'
  })
  @Patch('/publications/:id')
  async updatePublication(
    @Param('id') id: string,
    @Body() updatePublicationDto: PublicationDto
  ): Promise<Resume> {
    return this.resumesService.updatePublication(id, updatePublicationDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update publications with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [PublicationDto],
    content: {}
  })
  @Patch('/:resumeId/publications')
  async updatePublications(
    @Param('resumeId') resumeId: string,
    @Body() updatePublicationDto: PublicationDto[]
  ): Promise<Resume> {
    return this.resumesService.updatePublications(
      resumeId,
      updatePublicationDto
    );
  }

  @Delete('/publications/:id')
  async deletePublication(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deletePublication(id);
  }

  // PUBLICATIONS PART
  @Post('/:resumeId/side-projects')
  async addSideProject(
    @Param('resumeId') resumeId: string,
    @Body() addSideProjectDto: SideProjectsDto
  ): Promise<Resume> {
    return this.resumesService.addSideProject(resumeId, addSideProjectDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one side project details'
  })
  @Patch('/side-projects/:id')
  async updateSideProject(
    @Param('id') id: string,
    @Body() updateSideProjectDto: SideProjectsDto
  ): Promise<Resume> {
    return this.resumesService.updateSideProject(id, updateSideProjectDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update side projects with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [SideProjectsDto],
    content: {}
  })
  @Patch('/:resumeId/side-projects')
  async updateSideProjects(
    @Param('resumeId') resumeId: string,
    @Body() updateSideProjectDto: SideProjectsDto[]
  ): Promise<Resume> {
    return this.resumesService.updateSideProjects(
      resumeId,
      updateSideProjectDto
    );
  }

  @Delete('/side-projects/:id')
  async deleteSideProject(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteSideProjects(id);
  }

  // SOCIAL-LINKS PART
  @Post('/:resumeId/social-links')
  async addSocialLink(
    @Param('resumeId') resumeId: string,
    @Body() addSocialLinkDto: SocialLinksDto
  ): Promise<Resume> {
    return this.resumesService.addSocialLink(resumeId, addSocialLinkDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one social link details'
  })
  @Patch('/social-links/:id')
  async updateSocialLink(
    @Param('id') id: string,
    @Body() updateSocialLinkDto: SocialLinksDto
  ): Promise<Resume> {
    return this.resumesService.updateSocialLink(id, updateSocialLinkDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update side social links with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [SocialLinksDto],
    content: {}
  })
  @Patch('/:resumeId/social-links')
  async updateSocialLinks(
    @Param('resumeId') resumeId: string,
    @Body() updateSocialLinkDto: SocialLinksDto[]
  ): Promise<Resume> {
    return this.resumesService.updateSocialLinks(resumeId, updateSocialLinkDto);
  }

  @Delete('/social-links/:id')
  async deleteSocialLink(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteSocialLink(id);
  }

  // SKILL PART
  @Post('/:resumeId/skills')
  async addSkill(
    @Param('resumeId') resumeId: string,
    @Body() addSkillDto: SkillDto
  ): Promise<Resume> {
    return this.resumesService.addSkill(resumeId, addSkillDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update one skill details'
  })
  @Patch('/skills/:id')
  async updateSkill(
    @Param('id') id: string,
    @Body() updateSkillDto: SkillDto
  ): Promise<Resume> {
    return this.resumesService.updateSkill(id, updateSkillDto);
  }

  @ApiOperation({
    summary: 'Use this endpoint for update side skills with drag and drop'
  })
  @ApiImplicitBody({
    name: 'body',
    type: [SkillDto],
    content: {}
  })
  @Patch('/:resumeId/skills')
  async updateSkills(
    @Param('resumeId') resumeId: string,
    @Body() updateSkillsDto: SkillDto[]
  ): Promise<Resume> {
    return this.resumesService.updateSkills(resumeId, updateSkillsDto);
  }

  @Delete('/skills/:id')
  async deleteSkills(@Param('id') id: string): Promise<Resume> {
    return this.resumesService.deleteSkill(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

// entity
import { Resume, ResumeDocument } from './entity/resume.entity';

// utils
import { stringToObjectId } from '../../utils';

// dto
import {
  EducationDto,
  CreateResumeDto,
  ExperienceDto,
  ProjectDto,
  PublicationDto
} from './dto';
import { generateSetUpdateObject } from '../../utils/generateSetUpdateObject';
import { SideProjectsDto } from './dto/side-projects.dto';
import { SocialLinksDto } from './dto/social-links.dto';
import { SkillDto } from './dto/skill.dto';
import { Skill } from '../skills/entity/skill.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: Model<ResumeDocument>
  ) {}

  async getAll(): Promise<Resume[]> {
    return this.resumeModel.find();
  }

  async create(createResumeDto?: CreateResumeDto): Promise<Resume> {
    return new this.resumeModel({
      ...createResumeDto
    }).save();
  }

  async findOneResume(id: string): Promise<Resume> {
    const foundResume = await this.resumeModel.findOne({ _id: id }).populate({
      path: 'skills',
      populate: {
        path: 'skill',
        model: Skill.name
      }
    });

    if (!foundResume) {
      throw new NotFoundException('Resume is not found');
    }

    return foundResume;
  }

  async updateOne(id: string, updateResumeDto) {
    await this.findOneResume(id);

    await this.resumeModel.findOneAndUpdate(
      { _id: id },
      { ...updateResumeDto },
      { new: true }
    );
  }

  // EDUCATION PART
  async addEducation(
    id: string,
    addEducationDto: EducationDto
  ): Promise<Resume> {
    return this.addSubDocument<EducationDto>(id, 'education', addEducationDto);
  }

  async updateEducation(
    id: string,
    updateEducationDto: EducationDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, 'education', updateEducationDto);
  }

  async updateEducations(
    id: string,
    updateEducationsDto: EducationDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument(id, 'education', updateEducationsDto);
  }

  async deleteEducation(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'education');
  }

  // EXPERIENCE PART
  async addExperience(
    id: string,
    addExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.addSubDocument(id, 'experience', addExperienceDto);
  }

  async updateExperience(
    id: string,
    updateExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, 'experience', updateExperienceDto);
  }

  async updateExperiences(
    id: string,
    updateExperienceDto: ExperienceDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument(id, 'experience', updateExperienceDto);
  }

  async deleteExperience(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'experience');
  }

  // PROJECTS PART
  async addProject(id: string, addProjectDto: ProjectDto): Promise<Resume> {
    return this.addSubDocument(id, 'projects', addProjectDto);
  }

  async updateProject(
    id: string,
    updateProjectDto: ProjectDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, 'projects', updateProjectDto);
  }

  async updateProjects(
    id: string,
    updateProjectDto: ProjectDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument<ProjectDto[]>(
      id,
      'projects',
      updateProjectDto
    );
  }

  async deleteProject(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'projects');
  }

  // Publications PART
  async addPublication(
    id: string,
    addPublicationDto: PublicationDto
  ): Promise<Resume> {
    return this.addSubDocument(id, 'publications', addPublicationDto);
  }

  async updatePublication(
    id: string,
    updatePublicationDto: PublicationDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(
      id,
      'publications',
      updatePublicationDto
    );
  }

  async updatePublications(
    id: string,
    updatePublicationDto: PublicationDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument<PublicationDto[]>(
      id,
      'publications',
      updatePublicationDto
    );
  }

  async deletePublication(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'publications');
  }

  // Side Projects PART
  async addSideProject(
    id: string,
    addSideProjectDto: SideProjectsDto
  ): Promise<Resume> {
    return this.addSubDocument(id, 'sideProjects', addSideProjectDto);
  }

  async updateSideProject(
    id: string,
    updateSideProjectDto: SideProjectsDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(
      id,
      'sideProjects',
      updateSideProjectDto
    );
  }

  async updateSideProjects(
    id: string,
    updateSideProjectsDto: SideProjectsDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument<SideProjectsDto[]>(
      id,
      'sideProjects',
      updateSideProjectsDto
    );
  }

  async deleteSideProjects(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'sideProjects');
  }

  // Social Links PART
  async addSocialLink(
    id: string,
    addSocialLinkDto: SocialLinksDto
  ): Promise<Resume> {
    return this.addSubDocument(id, 'socialLinks', addSocialLinkDto);
  }

  async updateSocialLink(
    id: string,
    updateSocialLinkDto: SocialLinksDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, 'socialLinks', updateSocialLinkDto);
  }

  async updateSocialLinks(
    id: string,
    updateSocialLinksDto: SocialLinksDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument<SocialLinksDto[]>(
      id,
      'socialLinks',
      updateSocialLinksDto
    );
  }

  async deleteSocialLink(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'socialLinks');
  }

  // SKILLS PART
  async addSkill(id: string, addSkillDto: SkillDto): Promise<Resume> {
    return this.addSubDocument(id, 'skills', addSkillDto);
  }

  async updateSkill(id: string, updateSkillDto: SkillDto): Promise<Resume> {
    return this.updateSubDocumentDetail(id, 'skills', updateSkillDto);
  }

  async updateSkills(id: string, updateSkillsDto: SkillDto[]): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument<SkillDto[]>(id, 'skills', updateSkillsDto);
  }

  async deleteSkill(id: string): Promise<Resume> {
    return this.deleteSubDocument(id, 'skills');
  }

  // UNIVERSAL THING FOR ADD SUB DOCUMENT IN RESUME
  private async addSubDocument<T>(
    id: string,
    key: string,
    data: T
  ): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          [key]: {
            id: new Types.ObjectId(),
            ...data
          }
        }
      },
      { new: true }
    );
  }

  private async updateSubDocumentDetail<T>(
    id: string,
    key: string,
    data: T
  ): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      {
        [`${key}.id`]: stringToObjectId(id)
      },
      {
        $set: {
          ...generateSetUpdateObject(data, key)
        }
      },
      { new: true }
    );
  }

  private async updateSubDocument<T>(
    id: string,
    key: string,
    data: T
  ): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      { _id: id },
      { $set: { [key]: data } },
      { new: true }
    );
  }

  private async deleteSubDocument(id: string, key: string): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      {},
      {
        $pull: { [key]: { id: stringToObjectId(id) } }
      },
      { new: true }
    );
  }
}

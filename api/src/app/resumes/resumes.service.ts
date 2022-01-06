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
  ProjectDto
} from './dto';
import { generateSetUpdateObject } from '../../utils/generateSetUpdateObject';

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
    const foundResume = await this.resumeModel.findOne({ _id: id });

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
    key: string,
    addEducationDto: EducationDto
  ): Promise<Resume> {
    return this.addSubDocument(id, key, addEducationDto);
  }

  async updateEducation(
    id: string,
    key: string,
    updateEducationDto: EducationDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, key, updateEducationDto);
  }

  async updateEducations(
    id: string,
    key: string,
    updateEducationsDto: EducationDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument(id, key, updateEducationsDto);
  }

  async deleteEducation(id: string, key: string): Promise<Resume> {
    return this.deleteSubDocument(id, key);
  }

  // EXPERIENCE PART
  async addExperience(
    id: string,
    key: string,
    addExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.addSubDocument(id, key, addExperienceDto);
  }

  async updateExperience(
    id: string,
    key: string,
    updateExperienceDto: ExperienceDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, key, updateExperienceDto);
  }

  async updateExperiences(
    id: string,
    key: string,
    updateExperienceDto: ExperienceDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument(id, key, updateExperienceDto);
  }

  async deleteExperience(id: string, key: string): Promise<Resume> {
    return this.deleteSubDocument(id, key);
  }

  // PROJECTS PART
  async addProject(
    id: string,
    key: string,
    addProjectDto: ProjectDto
  ): Promise<Resume> {
    return this.addSubDocument(id, key, addProjectDto);
  }

  async updateProject(
    id: string,
    key: string,
    updateProjectDto: ProjectDto
  ): Promise<Resume> {
    return this.updateSubDocumentDetail(id, key, updateProjectDto);
  }

  async updateProjects(
    id: string,
    key: string,
    updateProjectDto: ProjectDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.updateSubDocument(id, key, updateProjectDto);
  }

  async deleteProject(id: string, key: string): Promise<Resume> {
    return this.deleteSubDocument(id, key);
  }

  // UNIVERSAL THING FOR ADD SUB DOCUMENT IN RESUME
  // TODO: FIX ANY TYPE
  private async addSubDocument(
    id: string,
    key: string,
    data: any
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

  private async updateSubDocumentDetail(
    id: string,
    key: string,
    data: any
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

  private async updateSubDocument(
    id: string,
    key: string,
    data: any
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

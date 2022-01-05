import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

// entity
import { Resume, ResumeDocument } from './entity/resume.entity';

// dto
import { EducationDto, CreateResumeDto } from './dto';

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

  async addEducation(
    id: string,
    addEducationDto: EducationDto
  ): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          education: {
            id: new Types.ObjectId(),
            ...addEducationDto
          }
        }
      },
      { new: true }
    );
  }

  async updateEducation(
    id: string,
    updateEducationDto: EducationDto
  ): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      {
        'education.id': new Types.ObjectId(id)
      },
      {
        $set: {
          'education.$.institute': updateEducationDto.institute,
          'education.$.name': updateEducationDto.name,
          'education.$.startDate': updateEducationDto.startDate,
          'education.$.endDate': updateEducationDto.endDate
        }
      },
      { new: true }
    );
  }

  async updateEducations(
    id: string,
    updateEducationsDto: EducationDto[]
  ): Promise<Resume> {
    await this.findOneResume(id);

    return this.resumeModel.findOneAndUpdate(
      { _id: id },
      { $set: { education: updateEducationsDto } },
      { new: true }
    );
  }

  async deleteEducation(id: string): Promise<Resume> {
    return this.resumeModel.findOneAndUpdate(
      {},
      {
        $pull: { education: { id: new Types.ObjectId(id) } }
      },
      { new: true }
    );
  }

  async updateOne(id: string, updateResumeDto) {
    await this.findOneResume(id);

    await this.resumeModel.findOneAndUpdate(
      { _id: id },
      { ...updateResumeDto },
      { new: true }
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// entity
import { Skill, SkillDocument } from './entity/skill.entity';

// dto
import { CreateSkillDto, UpdateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return new this.skillModel(createSkillDto).save();
  }

  async createMany(createSkillDto: CreateSkillDto[]): Promise<Skill[]> {
    return this.skillModel.insertMany(createSkillDto);
  }

  async getAll(): Promise<Skill[]> {
    return this.skillModel.find();
  }

  async updateOne(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.skillModel.findOneAndUpdate(
      { _id: id },
      { ...updateSkillDto },
      { new: true }
    );
  }

  async deleteOne(id: string): Promise<Skill> {
    return this.skillModel.findOneAndDelete({ _id: id });
  }
}

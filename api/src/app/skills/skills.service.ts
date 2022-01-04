import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './entity/skill.entity';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return new this.skillModel(createSkillDto).save();
  }

  async getAll(): Promise<Skill[]> {
    return this.skillModel.find();
  }
}

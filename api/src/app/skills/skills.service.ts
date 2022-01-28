import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// entity
import { Skill, SkillDocument } from './entity/skill.entity';

// dto
import { CreateSkillDto, UpdateSkillDto } from './dto/create-skill.dto';

// TODO: remove many skills add it on skills post request
@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>
  ) {}

  async create(
    createSkillDto: CreateSkillDto[] | CreateSkillDto
  ): Promise<Skill | Skill[]> {
    const skills = await this.skillModel.find();
    const skillNames = skills.map(skill => skill.name.toLowerCase());
    if (Array.isArray(createSkillDto)) {
      const incomeSkills = createSkillDto.map(skill => skill.name);

      const incomeUniqueSkills = incomeSkills
        .filter(skill => skillNames.indexOf(skill.toLowerCase()) === -1)
        .map(skill => ({ name: skill }));

      if (!incomeUniqueSkills.length) {
        throw new ConflictException('All skills arleady exist');
      }

      return this.skillModel.insertMany(incomeUniqueSkills);
    }

    if (skillNames.includes(createSkillDto.name.toLowerCase().trim())) {
      throw new ConflictException('Skill name already exist');
    }

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

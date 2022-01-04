import { Body, Controller, Get, Post } from '@nestjs/common';

// service
import { SkillsService } from './skills.service';

// entity
import { Skill } from './entity/skill.entity';

// dto
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  async getAll(): Promise<Skill[]> {
    return this.skillsService.getAll();
  }
}

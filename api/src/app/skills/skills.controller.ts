import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';

// service
import { SkillsService } from './skills.service';

// entity
import { Skill } from './entity/skill.entity';

// dto
import { CreateSkillDto, UpdateSkillDto } from './dto/create-skill.dto';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(
    @Body() createSkillDto: CreateSkillDto
  ): Promise<Skill | Skill[]> {
    return this.skillsService.create(createSkillDto);
  }

  @ApiImplicitBody({
    name: 'body',
    type: [CreateSkillDto],
    content: {}
  })
  @Post('/many')
  async createMany(@Body() createSkillDto: CreateSkillDto[]): Promise<Skill[]> {
    return this.skillsService.createMany(createSkillDto);
  }

  @Get()
  async getAll(): Promise<Skill[]> {
    return this.skillsService.getAll();
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto
  ): Promise<Skill> {
    return this.skillsService.updateOne(id, updateSkillDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.deleteOne(id);
  }
}

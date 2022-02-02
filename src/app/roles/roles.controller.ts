import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// service
import { RolesService } from './roles.service';

// dto
import { CreateRoleDto } from './dto/create-role.dto';

// entity
import { Role } from './entity/role.entity';

// guards
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.getOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.deleteOne(id);
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateRoleDto: CreateRoleDto
  ): Promise<Role> {
    return this.rolesService.updateOne(id, updateRoleDto);
  }
}

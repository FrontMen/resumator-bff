import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

// interface
import { APIQuery } from '../../interface';

// constants
import {
  usersQuerySwagger,
  usersSearchQuerySwagger,
  usersSortingQuerySwagger
} from './constants';

// entity
import { User } from './entity/user.entity';

// services
import { UsersService } from './users.service';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// decorators
import { GetUser, Roles } from '../../decorators';

// guards
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../../guards';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiQuery(usersQuerySwagger)
  @ApiQuery(usersSearchQuerySwagger)
  @ApiQuery(usersSortingQuerySwagger)
  @Get()
  async getAll(@Query() query: APIQuery): Promise<User[]> {
    return this.usersService.getAll(query);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.findOneAndUpdate(id, updateUserDto);
  }

  @Delete(':id')
  async findOneAndDeactivated(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneAndDeactivated(id);
  }
}

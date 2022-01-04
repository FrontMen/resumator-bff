import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

// entity
import { User } from './entity/user.entity';

// service
import { UsersService } from './users.service';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// TODO: Create folder for enums and interface
enum UserStatusEnums {
  deactivated = 'yes'
}

export interface Query {
  deactivated: string;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({
    name: 'deactivated',
    enum: UserStatusEnums,
    required: false
  })
  @Get()
  async getAll(@Query() query: Query): Promise<User[]> {
    return this.usersService.getAll(query);
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

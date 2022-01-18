import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// entity
import { User, UserDocument } from './entity/user.entity';

// service
import { ResumesService } from '../resumes/resumes.service';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// enum
import { APIQuery } from '../../interface';
import { Skill } from '../skills/entity/skill.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly resumesService: ResumesService
  ) {}

  async getAll(query: APIQuery): Promise<User[]> {
    const filter = {} as { deactivated?: boolean; $expr };
    const sort = { createdAt: -1 } as { createdAt: number };

    if (query.deactivated) {
      filter.deactivated = !!query.deactivated;
    }

    if (query.search) {
      filter.$expr = {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$lastName'] },
          regex: query.search || '',
          options: 'i'
        }
      };
    }

    if (query.sort && query.sort === 'oldest') {
      sort.createdAt = 1;
    }

    return this.userModel
      .find(filter)
      .populate([
        'role',
        'resume',
        {
          path: 'resume',
          populate: {
            path: 'skills',
            populate: {
              path: 'skill',
              model: Skill.name
            }
          }
        }
      ])
      .sort(sort)
      .select('-deactivated');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.findUserByEmail(createUserDto.email);

    if (foundUser) {
      throw new ConflictException('User already exist');
    }

    const resume = await this.resumesService.create();

    return new this.userModel({ ...createUserDto, resume: resume.id }).save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findOneAndUpdate(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const foundUser = await this.userModel.findOne({ _id: id });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto },
      { new: true }
    );
  }

  async findOneAndDeactivated(id: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      [
        {
          $set: {
            deactivated: {
              $cond: {
                if: { $eq: ['$deactivated', true] },
                then: false,
                else: true
              }
            }
          }
        }
      ],
      { new: true }
    );
  }
}

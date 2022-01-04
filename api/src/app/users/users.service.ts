import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// entity
import { User, UserDocument } from './entity/user.entity';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// interface
import { Query } from './users.controller';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(query: Query): Promise<User[]> {
    return this.userModel
      .find({ deactivated: !!query.deactivated })
      .populate('role')
      .select('-deactivated');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.findUserByEmail(createUserDto.email);

    if (foundUser) {
      throw new ConflictException('User already exist');
    }

    return new this.userModel({ ...createUserDto }).save();
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

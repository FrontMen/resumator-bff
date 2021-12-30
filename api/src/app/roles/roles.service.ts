import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// entity
import { Role, RoleDocument } from './entity/role.entity';

// dto
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getAll(): Promise<Role[]> {
    return this.roleModel.find();
  }

  async getOne(id: string): Promise<Role> {
    return this.roleModel.findOne({ _id: id });
  }

  async getOneByName(name: string): Promise<Role> {
    return this.roleModel.findOne({ name });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return new this.roleModel(createRoleDto).save();
  }

  async deleteOne(id: string): Promise<Role> {
    return this.roleModel.findOneAndDelete({ _id: id });
  }

  async updateOne(id: string, updateRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.findOneAndUpdate(
      { _id: id },
      { ...updateRoleDto },
      { new: true }
    );
  }
}

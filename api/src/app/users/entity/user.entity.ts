import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

// decorators
import { Base, BaseSchema } from '../../../decorators';

// entity
import { Role } from '../../roles/entity/role.entity';
import { IsOptional } from 'class-validator';

export type UserDocument = User & Document;

@BaseSchema()
export class User extends Base {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  @IsOptional()
  password: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Role.name
  })
  role: Role | string;
}

export const UserEntity = SchemaFactory.createForClass(User);

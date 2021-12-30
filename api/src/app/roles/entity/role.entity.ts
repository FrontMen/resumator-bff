import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

// decorators
import { Base, BaseSchema } from '../../../decorators';

// enum
import { EnumRoles } from '../../../enums';

export type RoleDocument = Role & Document;

@BaseSchema()
export class Role extends Base {
  @IsEnum(EnumRoles)
  @ApiProperty({ enum: EnumRoles, enumName: 'Roles' })
  @Prop({
    required: true,
    unique: true,
    enum: EnumRoles
  })
  name: string;
}

export const RoleEntity = SchemaFactory.createForClass(Role);

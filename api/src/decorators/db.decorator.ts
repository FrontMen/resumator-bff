import { applyDecorators } from '@nestjs/common';
import { Schema, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Base {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly id?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  readonly createdAt?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  readonly updatedAt?: string;
}

export function BaseSchema(options?: SchemaOptions) {
  return applyDecorators(
    Schema({
      timestamps: true,
      toObject: {
        virtuals: true
      },
      id: true,
      toJSON: {
        virtuals: true,
        transform: function (_, ret) {
          delete ret._id;
          delete ret.__v;
          delete ret.password;
          return ret;
        }
      },
      ...options
    })
  );
}

import { OmitType } from '@nestjs/swagger';

// entities
import { User } from '../entity/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt'
]) {}

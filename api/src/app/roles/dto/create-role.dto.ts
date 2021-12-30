import { OmitType } from '@nestjs/swagger';

// constants
import { omitFields } from '../../../constants';

// entities
import { Role } from '../entity/role.entity';

export class CreateRoleDto extends OmitType(Role, [
  'id',
  'createdAt',
  'updatedAt'
]) {}

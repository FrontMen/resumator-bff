// entities
import { UserSkill } from '../entity/user.entity';

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  skills?: UserSkill[];
}

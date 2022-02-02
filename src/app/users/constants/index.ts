import { UserStatusEnums, UserSortingEnums } from '../enum/user.enum';

export const usersQuerySwagger = {
  name: 'deactivated',
  enum: UserStatusEnums,
  required: false
};

export const usersSortingQuerySwagger = {
  name: 'sort',
  enum: UserSortingEnums,
  required: false
};

export const usersSearchQuerySwagger = {
  name: 'search',
  required: false
};

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// entity
import { User } from '../app/users/entity/user.entity';

export const GetUser = createParamDecorator<User>(
  (_: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  }
);

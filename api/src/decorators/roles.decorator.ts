import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const Roles = (...roles: string[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    ApiOperation({
      description: `ACCESS BY ROLES: ${
        roles?.length ? roles.join(', ') : 'ANY'
      }`
    })
  );

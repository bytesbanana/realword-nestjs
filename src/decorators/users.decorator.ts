import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { LoginUserRequest } from 'users/dto/login-user-request';
import { NewUserRequest } from 'users/dto/new-user-request';
import { UpdateUserRequest } from 'users/dto/update-user.request';
import { UserResponse } from 'users/dto/user-response';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Existing user login',
    }),
    ApiBody({
      type: LoginUserRequest,
      description: 'Credentials to use',
    }),
    ApiOkResponse({
      type: UserResponse,
      description: 'OK',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Unexpected error',
    })
  );
}

export function ApiRegister() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
    }),
    ApiBody({
      type: NewUserRequest,
      description: 'Register a new user',
    }),
    ApiCreatedResponse({
      type: UserResponse,
      description: 'OK',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Unexpected error',
    })
  );
}
export function ApiCurrentUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get current user',
      description: 'Gets the currently logged-in user',
    }),
    ApiOkResponse({
      type: UserResponse,
      description: 'OK',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Unexpected error',
    })
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user',
    }),
    ApiBody({
      type: UpdateUserRequest,
      description:
        'User details to update. At least <b>one</b> field is required.',
    }),
    ApiOkResponse({
      type: UserResponse,
      description: 'OK',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Unexpected error',
    })
  );
}

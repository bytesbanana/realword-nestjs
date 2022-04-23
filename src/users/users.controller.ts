import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/guard/jwt.guard';
import { LocalAuthGuard } from 'auth/guard/local.guard';
import { LoginUserRequest } from './dto/login-user-request';

import { NewUserRequest } from './dto/new-user-request';
import { UserResponse } from './dto/user-response';
import { UsersService } from './users.service';

@ApiTags('User and Authentication')
@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Existing user login' })
  @ApiBody({
    type: LoginUserRequest,
    description: 'Credentials to use',
  })
  @ApiOkResponse({
    type: UserResponse,
    description: 'OK',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unexpected error',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/users/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({
    type: NewUserRequest,
    description: 'Register a new user',
  })
  @ApiCreatedResponse({
    type: UserResponse,
    description: 'OK',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unexpected error',
  })
  @Post('/users')
  async register(
    @Body() newUserRequest: NewUserRequest
  ): Promise<UserResponse> {
    return this.usersService.add(newUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async get(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user')
  @ApiSecurity('token')
  async update(@Request() req) {
    return req.user;
  }
}

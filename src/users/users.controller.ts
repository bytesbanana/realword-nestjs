import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/guard/jwt.guard';
import { LocalAuthGuard } from 'auth/guard/local.guard';
import {
  ApiCurrentUser,
  ApiLogin,
  ApiRegister,
  ApiUpdateUser,
} from 'decorators/users.decorator';

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

  @ApiLogin()
  @UseGuards(LocalAuthGuard)
  @Post('/users/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiRegister()
  @Post('/users')
  async register(
    @Body() newUserRequest: NewUserRequest
  ): Promise<UserResponse> {
    return this.usersService.add(newUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  @ApiBearerAuth()
  @ApiCurrentUser()
  async get(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user')
  @ApiBearerAuth()
  @ApiUpdateUser()
  async update(@Request() req) {
    return req.user;
  }
}

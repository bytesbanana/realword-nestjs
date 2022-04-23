import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NewUserRequest } from './dto/new-user-request';
import { validate, ValidationError } from 'class-validator';
import { UserResponse } from './dto/user-response';
import { DEFAULT_PROFILE_IMAGE_URL } from 'lib/constants';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepos: Repository<User>) {}

  async add(newUserRequest: NewUserRequest): Promise<UserResponse> {
    const { username, email, password } = newUserRequest.user;
    // Check is user already exists
    const user = await this.userRepos
      .createQueryBuilder('user')
      .select('u')
      .where('u.username = :username', { username })
      .orWhere('u.email = :email', { email })
      .from(User, 'u')
      .getOne();

    if (user) {
      throw new HttpException(
        {
          errors: {
            'username or email': ' is already exists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    // validate
    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.image = DEFAULT_PROFILE_IMAGE_URL;

    const errors: ValidationError[] = await validate(newUser);

    if (errors.length > 0) {
      const [error] = errors;
      const { property, constraints } = error;
      const errorList = Object.keys(constraints).map((key) => constraints[key]);
      throw new HttpException(
        {
          errors: {
            [property]: errorList,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const savedUser = await this.userRepos.save(newUser);

    return this.buildUserResponse(savedUser);
  }

  async findByEmail(email): Promise<User> {
    const user = await this.userRepos.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  buildUserResponse({ email, image, username, bio }: User): UserResponse {
    // Create JWT

    const userResposne = new UserResponse();
    userResposne.user = {
      email,
      image,
      username,
      bio,
      token: '',
    };

    return userResposne;
  }
}

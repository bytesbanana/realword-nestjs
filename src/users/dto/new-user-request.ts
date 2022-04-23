import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class NewUser {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class NewUserRequest {
  @ApiProperty()
  user: NewUser;
}

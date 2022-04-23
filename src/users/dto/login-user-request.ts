import { ApiProperty } from '@nestjs/swagger';

class LoginUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginUserRequest {
  @ApiProperty()
  user: LoginUser;
}

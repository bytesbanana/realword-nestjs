import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  image: string;
}
export class UserResponse {
  @ApiProperty()
  user: User;
}

import { ApiProperty } from '@nestjs/swagger';

class UpdateUser {
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  image: string;
}

export class UpdateUserRequest {
  @ApiProperty()
  user: UpdateUser;
}

import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(req: any) {
    const { email, password } = req.body.user;

    const existingUser = await this.authService.validateUser(email, password);

    if (!existingUser) {
      throw new UnauthorizedException();
    }
    return existingUser;
  }
}

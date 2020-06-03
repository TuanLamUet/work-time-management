import { AuthCredentialsDto } from './auth-creditials.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() authcredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authcredentialsDto)
  }

}

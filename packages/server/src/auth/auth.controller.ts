import { AuthCredentialsDto } from './auth-creditials.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authcredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authcredentialsDto);
  }
}

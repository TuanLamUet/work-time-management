import { AuthCredentialsDto } from './auth-creditials.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authcredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authcredentialsDto);
  }

  @Post('/forgotpassword')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email)
  }

  @Post('/resetpassword/:id')
  resetPassword(@Param('id') id: string, @Body('newPassword') newPassword: string, @Body('reNewPassword') reNewPassword: string ) {
    return this.authService.resetPassword(id, newPassword, reNewPassword)
  }
}

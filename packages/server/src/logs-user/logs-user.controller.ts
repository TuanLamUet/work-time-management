import { LogsUserService } from './logs-user.service';
import { Controller, Post, Put, UseGuards, Get } from '@nestjs/common';
import { User } from 'src/users/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('logs')
@UseGuards(AuthGuard())
export class LogsUserController {
  constructor(private logsUserService:LogsUserService) {}
  
  @Get()
  showTimeLogs(@User() user) {
    return this.logsUserService.showTimeLogs(user)
  }

  @Post('/checkin')
  createCheckin(@User() user) {
    return this.logsUserService.createCheckin(user)
  }

  @Put('/checkout')
  createCheckout(@User() user) {
    return this.logsUserService.createCheckout(user)
  }
}

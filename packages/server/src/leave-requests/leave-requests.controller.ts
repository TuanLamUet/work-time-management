import { LeaveRequestsDto } from './leave-requests.dto';
import { Controller, Get, Body, UseGuards, Post, Query } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { User } from 'src/users/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('requests')
@UseGuards(AuthGuard())
export class LeaveRequestsController {
  constructor(
    private leaveRequestsService: LeaveRequestsService
  ) {}

  @Post()
  createNewRequest(@User() user, @Body() leaveRequestsDto: LeaveRequestsDto) {
    return this.leaveRequestsService.createNewRequest(user, leaveRequestsDto)
  }

  @Get()
  getAllRequest(@User() user, @Query('month') month: number) {
    return this.leaveRequestsService.getAllRequest(user, month)
  }
}

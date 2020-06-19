import { leaveRequestsProviders } from '../leave-requests/leave-requests.provider';
import { Module } from '@nestjs/common';
import { LeaveRequestsController } from './leave-requests.controller';
import { LeaveRequestsService } from './leave-requests.service';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService, ...leaveRequestsProviders],
})
export class LeaveRequestsModule {}

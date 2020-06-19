import { Connection } from 'typeorm';
import { LeaveRequests } from './leave-request.entity';

export const leaveRequestsProviders = [
  {
    provide: 'LEAVE-REQUESTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(LeaveRequests),
    inject: ['DATABASE_CONNECTION']
  }
]

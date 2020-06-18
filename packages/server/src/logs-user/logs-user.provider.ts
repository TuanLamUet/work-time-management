import { LogsUser } from './logs-user.entity';
import { Connection } from 'typeorm';

export const logsUserProviders = [
  {
    provide: 'LOGS-USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(LogsUser),
    inject: ['DATABASE_CONNECTION']
  }
]

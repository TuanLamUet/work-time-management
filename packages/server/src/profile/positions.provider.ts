import { Connection } from 'typeorm';
import { Positions } from './positions.entity';

export const positionsProviders = [
  {
    provide: 'POSITIONS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Positions),
    inject: ['DATABASE_CONNECTION']
  }
]

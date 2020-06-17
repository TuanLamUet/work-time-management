import { Profile } from './profile.entity';
import { Connection } from 'typeorm';

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Profile),
    inject: ['DATABASE_CONNECTION']
  }
]

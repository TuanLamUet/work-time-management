import { profileProviders } from './profile.provider';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { positionsProviders } from './positions.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [ ProfileService, ...profileProviders,...positionsProviders],
  controllers: [ProfileController],

})
export class ProfileModule {}

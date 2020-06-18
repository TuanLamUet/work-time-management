import { logsUserProviders } from './logs-user.provider';
import { Module } from '@nestjs/common';
import { LogsUserController } from './logs-user.controller';
import { LogsUserService } from './logs-user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LogsUserController],
  providers: [LogsUserService, ...logsUserProviders]
})
export class LogsUserModule {}

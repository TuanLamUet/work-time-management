import { ProfileModule } from './profile/profile.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { LogsUserModule } from './logs-user/logs-user.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads'
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    LogsUserModule,
    LeaveRequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

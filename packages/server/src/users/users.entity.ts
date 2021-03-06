import { LeaveRequests } from '../leave-requests/leave-request.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { LogsUser } from 'src/logs-user/logs-user.entity';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ default: 'staff' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    type => LogsUser,
    log => log.user,
  )
  logs: LogsUser[];

  @OneToMany(
    type => LeaveRequests,
    request => request.user,
  )
  requests: LeaveRequests[];

  async validateUserPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

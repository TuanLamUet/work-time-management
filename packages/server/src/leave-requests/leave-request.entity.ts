import { Users } from '../users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { IsString, IsNumber, MinLength, IsDate } from 'class-validator';

@Entity()
export class LeaveRequests extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'datetime'})
  @IsDate()
  timeFrom: Date;

  @Column({type: "datetime"})
  @IsDate()
  timeTo: Date;

  @Column()
  @IsString()
  @MinLength(10)
  reason: string;

  @Column()
  @IsNumber()
  absentHours: number;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(
    type => Users,
    user => user.requests,
  )
  user: Users;
}

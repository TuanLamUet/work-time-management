import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';

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
  @MinLength(8, {message: 'Password must contain at least 8 characters'})
  password: string;

  @Column({default: 'staff'})
  @IsString()
  role: string;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;
}

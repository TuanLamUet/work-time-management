import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: 'staff'})
  role: string;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;
}

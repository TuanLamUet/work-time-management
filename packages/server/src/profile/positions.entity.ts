import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class Positions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsString()
  name: string;
}

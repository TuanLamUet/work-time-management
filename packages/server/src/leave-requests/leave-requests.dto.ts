import { IsDate, IsString } from 'class-validator';

export class LeaveRequestsDto {
  @IsDate()
  timeFrom: Date;

  @IsDate()
  timeTo: Date;

  @IsString()
  reason: string;
}

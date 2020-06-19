import { LeaveRequestsDto } from '../leave-requests/leave-requests.dto';
import { Users } from 'src/users/users.entity';
import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LeaveRequests } from '../leave-requests/leave-request.entity';
import { request } from 'http';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @Inject('LEAVE-REQUESTS_REPOSITORY')
    private leaveRequestsRepository: Repository<LeaveRequests>,
  ) {}

  async createNewRequest(user: Users, leaveRequestsDto: LeaveRequestsDto) {
    const { timeFrom, timeTo, reason } = leaveRequestsDto;
    const request = new LeaveRequests();

    const leaveTimeTo = new Date(timeTo);
    const leaveTimeFrom = new Date(timeFrom);
    /*
     * chương trình báo lỗi khi:
     * thời gian nghỉ khác tháng
     * thời gian nghỉ khác năm
     * chọn giờ bắt đầu nghỉ trước 8h hoặc sau 18h
     * giờ nghỉ nhỏ hơn 0
     */
    if (
      leaveTimeTo.getTime() <= leaveTimeFrom.getTime() ||
      leaveTimeTo.getMonth() !== leaveTimeFrom.getMonth() ||
      leaveTimeTo.getFullYear() !== leaveTimeFrom.getFullYear() ||
      leaveTimeFrom.getHours() < 8 ||
      leaveTimeFrom.getHours() > 18 ||
      leaveTimeTo.getHours() < 8 ||
      leaveTimeTo.getHours() > 18
    ) {
      return { message: 'Enter an invalid time' };
    }

    request.timeFrom = leaveTimeFrom;
    request.timeTo = leaveTimeTo;
    request.reason = reason;

    request.absentHours =
      leaveTimeTo.getDate() - leaveTimeFrom.getDate() === 0
        ? leaveTimeTo.getHours() - leaveTimeFrom.getHours()
        : leaveTimeTo.getHours() - leaveTimeFrom.getHours()
        + (leaveTimeTo.getDate() - leaveTimeFrom.getDate()) * 8;
    request.user = user;
    try {
      await request.save();
      return { request };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async getAllRequest(user: Users, month: number) {
    const listRequest = await this.leaveRequestsRepository.find({
      where: {
        user: user.id,
      },
    });
    const filterAbsent = listRequest.filter(request => request.timeFrom.getMonth() + 1 === month * 1 );
    const totalAbsent = filterAbsent.reduce((countAbsent, request) => countAbsent + request.absentHours, 0);
    return {
      listRequest: filterAbsent,
      totalAbsent: totalAbsent
    };
  }
}

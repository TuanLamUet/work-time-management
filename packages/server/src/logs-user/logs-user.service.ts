import { Users } from './../users/users.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogsUser } from './logs-user.entity';

@Injectable()
export class LogsUserService {
  constructor(
    @Inject('LOGS-USER_REPOSITORY')
    private logsUserRepository: Repository<LogsUser>,
  ) {}

  // show tất cả các bản ghi checkin, checkout
  async showTimeLogs(user: Users) {
    const timelogs = await this.logsUserRepository.find({
      where: {
        user: user.id,
      },
    });

    return timelogs;
  }
  /*
   *  kiểm tra xem hôm đó người dùng đã checkin chưa, nếu đã checkin thì báo lỗi
   */
  async createCheckin(user: Users) {
    try {
      /*
      * tìm kiếm bản ghi gần nhất rồi so sánh với hôm nay xem có trùng ngày tháng năm không,
      * nếu trùng thì báo là đã checkin rồi, nếu không thì cho checkin bình thường
      */
      const today = new Date();
      let log = await this.logsUserRepository.findOne({
        select: ['checkin'],
        order: {
          id: 'DESC',
        },
      });
      if (
        !(
          log.checkin.getDate === today.getDate &&
          log.checkin.getMonth === today.getMonth &&
          log.checkin.getFullYear === today.getFullYear
        )
      ) {
        log = new LogsUser();
        log.checkin = new Date();
        log.user = user;
        log.save();
        return log;
      } else {
        return {
          message: 'You already checkin',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  /*
   *  phải checkin thì mới có thể checkout được, chỉ có thể checkout được một lần
   */
  async createCheckout(user: Users) {
    try {
      const log = await this.logsUserRepository.findOne({
        where: {
          user: user.id,
          checkout: null,
        },
        order: {
          id: 'DESC',
        },
      });
      if (log) {
        await this.logsUserRepository.update(log.id, { checkout: new Date() });
        return log;
      } else if (!log) {
        return {
          message: 'You must checkin before',
        };
      } else if (log.checkout !== null) {
        message: 'you can only checkout once';
      }
    } catch (error) {
      console.log(error);
    }
  }
}

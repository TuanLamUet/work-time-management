import { v4 } from 'uuid';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './auth-creditials.dto';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from 'src/utils/send-email';
import * as bcrypt from 'bcryptjs';
import { redis } from 'src/utils/redis';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentials: AuthCredentialsDto): Promise<{ accessToken }> {
    try {
      interface LoginSuccess {
        accessToken: string;
        user: object;
      }
      const { email, password, remember } = authCredentials;
      const user = await this.usersRepository.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('invalid credentials');
      }
      const validPassword = await user.validateUserPassword(password);
      if (!validPassword) {
        throw new UnauthorizedException('invalid credentials');
      }
      const payload: JwtPayload = { email: user.email, role: user.role };

      let accessToken;
      if (remember) {
        accessToken = this.jwtService.sign(payload, { expiresIn: '999y' });
      } else {
        accessToken = this.jwtService.sign(payload);
      }

      if (user && validPassword) {
        const loginSuccess: LoginSuccess = {
          accessToken,
          user,
        };
        return loginSuccess;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const id = v4();
        redis.set(id, user.email, 'ex', 60 * 10);
        sendEmail(
          user.email,
          `http://${process.env.BACKEND_URI}/api/auth/resetpassword/${id}`,
        );
        return {
          message: 'check your mail to change password',
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async resetPassword(id: string, newPassword: string, reNewPassword) {
    const email = await redis.get(id);
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      if (reNewPassword !== newPassword) {
        return {
          message: 'New passwords must be identical',
        };
      }
      try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        user.save();
        return user;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }
}

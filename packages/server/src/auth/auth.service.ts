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

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentials: AuthCredentialsDto): Promise<{ accessToken }> {
    try {
      const { email, password } = authCredentials;
      const user = await this.usersRepository.findOne({ email });
      const validPassword = await user.validateUserPassword(password);
      if (!user || !validPassword) {
        throw new UnauthorizedException('invalid credentials');
      }

      const payload: JwtPayload = { email: user.email, role: user.role };
      const accessToken = this.jwtService.sign(payload);

      if (user && validPassword) {
        return { accessToken };
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

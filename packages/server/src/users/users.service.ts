import { UsersDto } from './users.dto';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Users } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  async createUser(usersDto: UsersDto) {
   try {
    const { email, password, role } = usersDto;
    const roundSalt = 8;
    const salt = await bcrypt.genSalt(roundSalt);
    
    const user = new Users();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.role = role;
    await user.save()
   } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') { //duplicate account
        throw new ConflictException('User already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
  
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

import { Positions } from './positions.entity';
import { Profile } from './profile.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileDto } from './profile.dto';
import { Users } from 'src/users/users.entity';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
    @Inject('POSITIONS_REPOSITORY')
    private positionsRepository: Repository<Positions>,
  ) {}

  async createProfile(user: Users, profileDto: ProfileDto) {
    const { firstName, lastName, gender, dob } = profileDto;
    try {
      const profile = new Profile();

      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.gender = gender;
      profile.dob = dob;
      profile.user = user;
      await this.profileRepository.save(profile);
      return {
        message: 'Profile created',
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //update profile
  async updateProfile(user: Users, profileDto: ProfileDto): Promise<Profile> {
    try {
      const currentProfile = await this.profileRepository.findOne({
        where: {
          user: user.id,
        },
      });
      const profile = plainToClassFromExist(currentProfile, profileDto, {
        groups: ['firstName', 'lastName', 'gender', 'dob'],
      });
      await this.profileRepository.save(profile);
      return profile;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // create new position by admin
  async createNewPosition(positionName: string) {
    let position = await this.positionsRepository.findOne({
      where: {
        name: positionName,
      },
    });

    if (!position) {
      position = new Positions();
      position.name = positionName;
      await position.save();
      return position;
    } else {
      return {
        message: 'This position already exist',
      };
    }
  }

  async addPositionToProfile(user: Users, positionName: string) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: user.id,
      },
      relations: ['positions'],
    });
    if (!profile) {
      return {
        message: 'Create profile before',
      };
    }

    const position = await this.positionsRepository.findOne({
      where: {
        name: positionName,
      },
    });

    if (!position) {
      return {
        message: 'This position is unavailable',
      };
    }
    profile.positions.push(position);
    await profile.save();
    return profile;
  }

  async deleteAPosition(user: Users, positionName: string) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: user.id,
      },
      relations: ['positions'],
    });

    if (profile) {
      profile.positions = profile.positions.filter(
        position => position.name !== positionName,
      );
      await profile.save();
      return {
        message: 'remove position success',
      };
    }
  }

  async getProfile(user: Users) {
    try {
      const profile = await this.profileRepository.findOne({
        where: {
          user: user.id,
        },
        relations: ['positions'],
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async uploadAvatar(user: Users, file: any) {
    try {
      const profile = await this.profileRepository.findOne({
        where: {
          user: user.id,
        },
      });
      if (profile) {
        profile.avatar = file.path;
        await this.profileRepository.save(profile);
        return {
          message: 'upload avatar success',
          avatar: profile.avatar,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

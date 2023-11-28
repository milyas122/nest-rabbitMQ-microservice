import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne(createUserDto.email);
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('email is already exist');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne(email);
    if (!user) {
      throw new UnauthorizedException("user doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    return user;
  }

  async getUser(userDto: GetUserDto) {
    return await this.usersRepository.getById(userDto._id);
  }
}

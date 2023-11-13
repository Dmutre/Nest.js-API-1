import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDTO) {
    const user = this.userRepository.create(dto);
    return user;
  }

  async getAll() {
    const users = this.userRepository.findAll();
    return users;
  }
}

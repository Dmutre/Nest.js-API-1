import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) 
  private userRepository: typeof User,
  private roleService: RolesService) {}

  async createUser(dto: CreateUserDTO) {
    const user = this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    (await user).$set('roles', [role.id]);
    return user;
  }

  async getAll() {
    const users = this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email: email}, include: {all: true}});
    return user;
  }
}

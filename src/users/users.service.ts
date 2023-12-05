import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/AddRoleDTO';
import { BanUserDTO } from './dto/BanUserDTO';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) 
  private userRepository: typeof User,
  private roleService: RolesService) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    (await user).$set('roles', [role.id]);
    user.roles = [role];
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

  async addRole(dto: AddRoleDTO) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if(role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDTO) {
    const user = await this.userRepository.findByPk(dto.userId);
    if(!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}

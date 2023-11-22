import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/CreateUserDTO';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {}

  async login(userDTO: CreateUserDTO) {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }

  async registration(userDTO: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(userDTO.email);
    if(candidate) {
      throw new HttpException('User with such email exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDTO.password, Number(process.env.SALT));
    const user = await this.userService.createUser({...userDTO, password: hashPassword});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDTO: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(userDTO.email);
    const passwordEqual = await bcrypt.compare(userDTO.password, user.password);
    if(user && passwordEqual) {
      return user;
    } 
    throw new UnauthorizedException({message: 'Incorrect password or email'});
  }
}

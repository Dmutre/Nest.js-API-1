import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { AddRoleDTO } from './dto/AddRoleDTO';
import { BanUserDTO } from './dto/BanUserDTO';

@Controller('users')
@ApiTags('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @ApiOperation({summary: 'Give role'})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(
    @Body() dto: AddRoleDTO
  ) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({summary: 'Ban user'})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(
    @Body() dto: BanUserDTO
  ) {
    return this.userService.banUser(dto);
  }
}

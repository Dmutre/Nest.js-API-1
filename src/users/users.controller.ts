import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

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
}

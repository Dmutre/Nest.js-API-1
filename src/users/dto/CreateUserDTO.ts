import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreateUserDTO {
  @ApiProperty({example: 'dog@monkey.com', description: 'Email of user'})
  @IsEmail()
  readonly email: string;
  @ApiProperty({example: 'rffffff', description: 'Password of user'})
  @IsString()
  @Length(4, 16, {message: 'Not more then 16, less then 4'})
  readonly password: string;
}
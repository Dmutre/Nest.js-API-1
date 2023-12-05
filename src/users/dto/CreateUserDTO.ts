import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";


export class CreateUserDTO {
  @ApiProperty({example: 'dog@monkey.com', description: 'Email of user'})
  @IsEmail()
  readonly email: string;
  @ApiProperty({example: 'rffffff', description: 'Password of user'})
  readonly password: string;
}
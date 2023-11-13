import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDTO {
  @ApiProperty({example: 'dog@monkey.com', description: 'Email of user'})
  readonly email: string;
  @ApiProperty({example: 'rffffff', description: 'Password of user'})
  readonly password: string;
}
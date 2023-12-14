import { IsNumber, IsString } from "class-validator";


export class AddRoleDTO {
  @IsString()
  readonly value: string;
  @IsNumber()
  readonly userId: number;
}
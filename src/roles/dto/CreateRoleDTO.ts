import { IsString } from "class-validator";

export class CreateRoleDTO {
  @IsString()
  readonly value: string;
  @IsString()
  readonly description: string;
}
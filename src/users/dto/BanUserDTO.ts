import { IsNumber, IsString } from "class-validator";


export class BanUserDTO {
  @IsNumber()
  readonly userId: number;
  @IsString()
  readonly banReason: string;
}
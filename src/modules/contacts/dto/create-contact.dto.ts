import { IsEmail, IsString, Length } from "class-validator";

export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(11)
  number: string;
}

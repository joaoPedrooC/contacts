import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @Transform(({ value }: { value: string }) => hashSync(value), { groups: ['transform'] })
  password: string

  @IsString()
  @Length(11, 11)
  number: string
}

import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  email!: string;
  name!: string;
  password!: string;
  age!: number;
}

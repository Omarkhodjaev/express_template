import { IsEmail, IsOptional, MinLength, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(3, { message: "Name must be at least 3 characters" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Email must be valid" })
  email?: string;

  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password?: string;
}

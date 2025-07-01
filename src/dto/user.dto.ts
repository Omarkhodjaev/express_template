import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  name!: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email!: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email!: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;
} 
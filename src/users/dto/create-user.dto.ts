import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: "Ariana"})
  @IsString({message: "Must be string"})
  @Length(2, 32, {message: 'Length of name must be 2-32'})
  readonly firstName: string;

  @ApiProperty({example: "Grande"})
  @IsString({message: "Must be string"})
  @Length(2, 32, {message: 'Length of name must be 2-32'})
  readonly lastName: string;

  @ApiProperty({example: "Student"})
  @IsString({message: "Must be string"})
  @Length(2, 32, {message: 'Length of name must be 2-32'})
  readonly role: string;

  @ApiProperty({example: "user@mail.com", description: 'Email'})
  @IsString({message: "Must be string"})
  @IsEmail({},{message: 'Incorrect email'})
  readonly email: string;

  @ApiProperty({example: "12345678", description: 'Password'})
  @IsString({message: "Must be string"})
  @Length(8, 16, {message: 'Length of password must be 8-16'})
  readonly password: string;
}
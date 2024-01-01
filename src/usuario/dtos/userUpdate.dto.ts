import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string

  @IsString()
  @MinLength(6)
  @IsOptional()
  senha: string
}

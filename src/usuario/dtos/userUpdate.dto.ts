import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { UniqueEmail } from "../validators/uniqueEmail.validator"

export class UserUpdateDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @UniqueEmail()
    @IsOptional()
    email: string

    @IsString()
    @MinLength(6)
    @IsOptional()
    senha: string
}
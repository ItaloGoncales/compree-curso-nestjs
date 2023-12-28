import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { UniqueEmail } from "../validators/uniqueEmail.validator"

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @UniqueEmail()
    email: string

    @IsString()
    @MinLength(6)
    senha: string
}
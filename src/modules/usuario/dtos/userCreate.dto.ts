import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  nome: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  senha: string
}

import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ProdutoImagemDto {
    @IsUrl()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    descricao: string
}
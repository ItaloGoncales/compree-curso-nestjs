import { IsNotEmpty, IsString } from "class-validator"

export class ProdutoCaracteristicaDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    descricao: string
}
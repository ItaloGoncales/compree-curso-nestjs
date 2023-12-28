import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator"
import { ProdutoCaracteristicaDto } from "./produtoCaracteristica.dto";
import { ProdutoImagemDto } from "./produtoImagem.dto";
import { Type } from "class-transformer";

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsNumber()
    @IsNotEmpty()
    quantidade: number;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @ValidateNested()
    @IsArray()
    @Type(() => ProdutoCaracteristicaDto)
    caracteristicas: ProdutoCaracteristicaDto[];


    @ValidateNested()
    @IsArray()
    @Type(() => ProdutoImagemDto)
    imagens: ProdutoImagemDto[];

    @IsString()
    @IsNotEmpty()
    categoria: string;

}
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class ProdutoImagemDto {
  @IsUrl()
  url: string

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string
}

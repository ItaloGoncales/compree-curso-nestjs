import { IsNotEmpty, IsString, IsUrl } from 'class-validator'
import { ProdutoEntity } from '../produto.entity'

export class ProdutoImagemDto {
  id: string

  @IsUrl()
  url: string

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string

  produto: ProdutoEntity
}

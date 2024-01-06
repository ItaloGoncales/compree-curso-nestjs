import { IsNotEmpty, IsString } from 'class-validator'
import { ProdutoEntity } from '../produto.entity'

export class ProdutoCaracteristicaDto {
  id: string

  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string

  produto: ProdutoEntity
}

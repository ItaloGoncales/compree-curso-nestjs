import { IsNotEmpty, IsString } from 'class-validator'

export class ProdutoCaracteristicaDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string
}

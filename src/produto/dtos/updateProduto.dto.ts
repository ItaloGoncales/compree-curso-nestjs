import { PartialType } from '@nestjs/mapped-types'
import { ProdutoCreateDto } from './createProduto.dto'

export class UpdateProdutoDto extends PartialType(ProdutoCreateDto) {}

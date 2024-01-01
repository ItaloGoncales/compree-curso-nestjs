import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProdutoService } from './produto.service'
import { UpdateProdutoDto } from './dtos/updateProduto.dto'
import { ProdutoCreateDto } from './dtos/createProduto.dto'

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaProdutos(@Body() dadosProduto: ProdutoCreateDto) {
    // produto.caracteristicas = dadosProduto.caracteristicas
    // produto.imagens = dadosProduto.imagens

    const produtoCadastrado = this.produtoService.salvar(dadosProduto)
    return produtoCadastrado
  }

  @Get()
  async produtos(): Promise<any[]> {
    return await this.produtoService.produtos()
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() dadosProduto: UpdateProdutoDto) {
    const produtoAlterado = await this.produtoService.atualiza(id, dadosProduto)

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.remove(id)

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    }
  }
}

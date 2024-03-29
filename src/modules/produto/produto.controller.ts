import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { ProdutoService } from './produto.service'
import { UpdateProdutoDto } from './dtos/updateProduto.dto'
import { ProdutoCreateDto } from './dtos/createProduto.dto'
import { ProdutoEntity } from './produto.entity'
import { CacheInterceptor } from '@nestjs/cache-manager'

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
  @UseInterceptors(CacheInterceptor)
  async produtos(): Promise<any[]> {
    return await this.produtoService.produtos()
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async produto(@Param('id') produtoId: string): Promise<ProdutoEntity> {
    return await this.produtoService.produto(produtoId)
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

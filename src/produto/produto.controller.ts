import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @Post()
    async criaProdutos(@Body() dados) {
        await this.produtoService.salvar(dados)
        return dados
    }

    @Get()
    async produtos(): Promise<any[]> {
        return await this.produtoService.produtos()
    }
}

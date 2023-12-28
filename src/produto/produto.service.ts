import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService {
    private produtosList: any[]

    async produtos(): Promise<any[]> {
        return this.produtosList
    }

    async salvar(produto) {
        this.produtosList.push(produto)
    }
}

import { Injectable } from '@nestjs/common'
import { ProdutoEntity } from './produto.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity'
import { ProdutoImagemEntity } from './produto-imagem.entity'
import { ProdutoCreateDto } from './dtos/createProduto.dto'

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    @InjectRepository(ProdutoCaracteristicaEntity)
    private readonly produtoCaracteristicaRepository: Repository<ProdutoCaracteristicaEntity>,
    @InjectRepository(ProdutoImagemEntity)
    private readonly produtoImagemRepository: Repository<ProdutoImagemEntity>,
  ) {}

  private produtosList: any[]

  async produtos(): Promise<ProdutoEntity[]> {
    return await this.produtoRepository.find()
  }

  async salvar(produto: ProdutoCreateDto): Promise<ProdutoEntity> {
    return await this.produtoRepository.save(produto)
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtosList.find((produto) => produto.id === id)

    if (!possivelProduto) {
      throw new Error('Produto não existe')
    }

    return possivelProduto
  }

  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId']
    const produto = this.buscaPorId(id)
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return
      }
      produto[chave] = valor
    })

    return produto
  }

  async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id)
    this.produtosList = this.produtosList.filter((produto) => produto.id !== id)
    return produtoRemovido
  }
}

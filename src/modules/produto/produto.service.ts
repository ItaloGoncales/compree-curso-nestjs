import { Injectable, NotFoundException } from '@nestjs/common'
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

  async produtos(): Promise<ProdutoEntity[]> {
    return await this.produtoRepository.find()
  }

  async salvar(produto: ProdutoCreateDto): Promise<ProdutoEntity> {
    const produtoEntity = new ProdutoEntity()

    Object.assign(produtoEntity, produto as ProdutoEntity)

    return await this.produtoRepository.save(produtoEntity)
  }

  async produto(id: string): Promise<ProdutoEntity> {
    const possivelProduto = await this.produtoRepository.findOneBy({ id })

    if (!possivelProduto) {
      throw new Error('Produto não existe')
    }

    return possivelProduto
  }

  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const entity = await this.produtoRepository.findOneBy({ id })

    if (entity === null) {
      throw new NotFoundException('O produto não foi encontrado')
    }

    Object.assign(entity, dadosProduto as ProdutoEntity)

    return await this.produtoRepository.save(entity)
  }

  async remove(id: string) {
    const produtoRemovido = this.produto(id)

    if (!produtoRemovido) throw new NotFoundException(`Produto ${id} não encontrado`)

    return await this.produtoRepository.delete({ id })
  }
}

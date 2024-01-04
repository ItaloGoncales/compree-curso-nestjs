import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PedidoEntity } from './pedido.entity'
import { In, Repository } from 'typeorm'
import { UsuarioEntity } from '../usuario/usuario.entity'
import { StatusPedido } from './enum/statusPedido.enum'
import { CriaPedidoDTO } from './dto/cria-pedido.dto'
import { ItemPedidoEntity } from './item-pedido.entity'
import { ProdutoEntity } from '../produto/produto.entity'
import { AtualizaPedidoDto } from './dto/atualiza-pedido.dto'

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private validatePedidos(pedido: CriaPedidoDTO, produtos: ProdutoEntity[]): void {
    pedido.itensPedido.forEach((item) => {
      const produto = produtos.find((produto) => produto.id === item.produtoId)

      if (!produto) {
        throw new NotFoundException(`Produto '${item.produtoId}' não encontrado`)
      }

      if (item.quantidade > produto.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${item.quantidade}) é maior do que a disponível (${produto.quantidadeDisponivel}) para o produto ${produto.nome}`,
        )
      }
    })
  }

  async pedidos(usuarioId: string): Promise<PedidoEntity[]> {
    return await this.pedidoRepository.find({
      where: {
        usuario: {
          id: usuarioId,
        },
      },
      relations: {
        usuario: true,
      },
    })
  }

  async cadastraPedido(usuarioId: string, dadosPedido: CriaPedidoDTO): Promise<PedidoEntity> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: usuarioId,
    })

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const produtoIds = dadosPedido.itensPedido.map((item) => item.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtoIds),
    })

    this.validatePedidos(dadosPedido, produtosRelacionados)

    const pedidoEntity = new PedidoEntity()

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario
    pedidoEntity.itensPedidos = dadosPedido.itensPedido.map((item) => {
      const produto = produtosRelacionados.find((produto) => produto.id === item.produtoId)

      const itemPedidoEntity = new ItemPedidoEntity()
      itemPedidoEntity.precoVenda = produto!.valor
      itemPedidoEntity.quantidade = item.quantidade
      itemPedidoEntity.produto = produto!
      itemPedidoEntity.produto.quantidadeDisponivel -= item.quantidade

      return itemPedidoEntity
    })

    pedidoEntity.valorTotal = pedidoEntity.itensPedidos.reduce(
      (total, item) => total + item.precoVenda * item.quantidade,
      0,
    )

    return await this.pedidoRepository.save(pedidoEntity)
  }

  async atualizaPedido(pedidoId: string, dadosPedido: AtualizaPedidoDto): Promise<PedidoEntity> {
    const pedidoEntity = await this.pedidoRepository.findOneBy({ id: pedidoId })

    if (!pedidoEntity) {
      throw new NotFoundException(`Pedido não encontrado`)
    }

    Object.assign(pedidoEntity, dadosPedido)

    return await this.pedidoRepository.save(pedidoEntity)
  }
}

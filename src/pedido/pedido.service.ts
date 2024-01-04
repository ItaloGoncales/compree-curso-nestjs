import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PedidoEntity } from './pedido.entity'
import { Repository } from 'typeorm'
import { UsuarioEntity } from '../usuario/usuario.entity'
import { StatusPedido } from './enum/statusPedido.enum'
import { CriaPedidoDTO } from './dto/cria-pedido.dto'
import { ItemPedidoEntity } from './item-pedido.entity'

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

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

    const pedidoEntity = new PedidoEntity()

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario
    pedidoEntity.itensPedidos = dadosPedido.itensPedido.map((item) => {
      const itemPedidoEntity = new ItemPedidoEntity()
      itemPedidoEntity.precoVenda = 10
      itemPedidoEntity.quantidade = item.quantidade

      return itemPedidoEntity
    })

    pedidoEntity.valorTotal = pedidoEntity.itensPedidos.reduce(
      (total, item) => total + item.precoVenda * item.quantidade,
      0,
    )

    return await this.pedidoRepository.save(pedidoEntity)
  }
}

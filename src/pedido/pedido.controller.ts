import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CriaPedidoDTO } from './dto/cria-pedido.dto'

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string, @Body() dadosPedido: CriaPedidoDTO) {
    return await this.pedidoService.cadastraPedido(usuarioId, dadosPedido)
  }

  @Get()
  async pedidos(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.pedidos(usuarioId)
  }
}

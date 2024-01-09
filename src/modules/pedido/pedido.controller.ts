import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CriaPedidoDTO } from './dto/cria-pedido.dto'
import { AtualizaPedidoDto } from './dto/atualiza-pedido.dto'
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard'

@UseGuards(AutenticacaoGuard)
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

  @Patch(':id')
  async atualizaPedido(@Param('id') pedidoId: string, @Body() dadosPedido: AtualizaPedidoDto) {
    return await this.pedidoService.atualizaPedido(pedidoId, dadosPedido)
  }
}

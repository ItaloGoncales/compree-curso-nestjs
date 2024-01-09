import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CriaPedidoDTO } from './dto/cria-pedido.dto'
import { AtualizaPedidoDto } from './dto/atualiza-pedido.dto'
import { AutenticacaoGuard, RequestWithUser } from '../autenticacao/autenticacao.guard'

@UseGuards(AutenticacaoGuard)
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Req() req: RequestWithUser, @Body() dadosPedido: CriaPedidoDTO) {
    return await this.pedidoService.cadastraPedido(req.usuario.sub, dadosPedido)
  }

  @Get()
  async pedidos(@Req() req: RequestWithUser) {
    return await this.pedidoService.pedidos(req.usuario.sub)
  }

  @Patch(':id')
  async atualizaPedido(@Param('id') pedidoId: string, @Body() dadosPedido: AtualizaPedidoDto) {
    return await this.pedidoService.atualizaPedido(pedidoId, dadosPedido)
  }
}

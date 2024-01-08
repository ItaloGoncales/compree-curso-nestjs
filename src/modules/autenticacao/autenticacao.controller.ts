import { Controller, Post, Body } from '@nestjs/common'
import { AutenticacaoService } from './autenticacao.service'
import { AuthenticateDto } from './dto/authenticate.dto'

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post()
  login(@Body() { email, senha }: AuthenticateDto) {
    return this.autenticacaoService.login(email, senha)
  }
}

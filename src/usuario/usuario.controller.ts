import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async criaUsuario(@Body() dados) {
        await this.usuarioService.salvar(dados)
        return dados
    }

    @Get()
    async usuarios(): Promise<any[]> {
        return await this.usuarioService.usuarios()
    }
}
 
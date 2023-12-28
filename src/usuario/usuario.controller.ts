import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UserCreateDto } from './dtos/userCreate.dto';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async criaUsuario(@Body() dados: UserCreateDto) {
        return await this.usuarioService.salvar(dados)
    }

    @Get()
    async usuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioService.usuarios()
    }
}

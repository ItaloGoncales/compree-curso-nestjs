import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UserCreateDto } from './dtos/userCreate.dto';
import { UserListDTO } from './dtos/userList.dto';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async criaUsuario(@Body() dados: UserCreateDto): Promise<UserListDTO> {
        const userEntity = await this.usuarioService.salvar(dados)
        return new UserListDTO(userEntity.id, userEntity.nome)
    }

    @Get()
    async usuarios(): Promise<UserListDTO[]> {
        return (await this.usuarioService.usuarios()).map(user => new UserListDTO(user.id, user.nome))
    }
}

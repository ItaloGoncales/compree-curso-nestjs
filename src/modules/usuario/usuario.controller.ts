import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { UserCreateDto } from './dtos/userCreate.dto'
import { UserListDTO } from './dtos/userList.dto'
import { UserUpdateDto } from './dtos/userUpdate.dto'
import { HashPasswordPipe } from '../../resources/pipes/hash-password.pipe'

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async usuarios(): Promise<UserListDTO[]> {
    return await this.usuarioService.usuarios()
  }

  @Post()
  async criaUsuario(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...dados }: UserCreateDto,
    @Body('senha', HashPasswordPipe) senhaHash: string,
  ): Promise<UserListDTO> {
    const userEntity = await this.usuarioService.salvar({ ...dados, senha: senhaHash })
    return new UserListDTO(userEntity.id, userEntity.nome)
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() dados: UserUpdateDto) {
    const userEntity = await this.usuarioService.atualizar(id, dados)
    return new UserListDTO(userEntity.id, userEntity.nome)
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    await this.usuarioService.deletar(id)
    return {
      success: true,
    }
  }
}

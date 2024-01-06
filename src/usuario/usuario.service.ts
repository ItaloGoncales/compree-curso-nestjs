import { Injectable, NotFoundException } from '@nestjs/common'
import { UsuarioEntity } from './usuario.entity'
import { UserCreateDto } from './dtos/userCreate.dto'
import { UserUpdateDto } from './dtos/userUpdate.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserListDTO } from './dtos/userList.dto'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  private usuarioLista: UsuarioEntity[] = []

  async usuarios(): Promise<UserListDTO[]> {
    return (await this.usuarioRepository.find()).map((usuario) => new UserListDTO(usuario.id, usuario.nome))
  }

  async usuario(email: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({ where: { email: email } })

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return usuario
  }

  async findById(id: string): Promise<UsuarioEntity> {
    const userDb = await this.usuarioRepository.findOneBy({ id: id })

    if (!userDb) throw new NotFoundException('Usuário não encontrado')

    return userDb
  }

  async salvar(usuario: UserCreateDto): Promise<UsuarioEntity> {
    const usuarioEntity = new UsuarioEntity()

    Object.assign(usuarioEntity, usuario as UsuarioEntity)

    return await this.usuarioRepository.save(usuarioEntity)
  }

  async atualizar(id: string, dadosAtualizados: Partial<UserUpdateDto>): Promise<UsuarioEntity> {
    const userDb = await this.findById(id)

    Object.assign(userDb, dadosAtualizados as UserUpdateDto)

    await this.usuarioRepository.update(id, userDb)

    return userDb
  }

  async deletar(id: string): Promise<void> {
    await this.usuarioRepository.delete(id)
  }
}

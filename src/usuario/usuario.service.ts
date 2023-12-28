import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { UserCreateDto } from './dtos/userCreate.dto';
import { v4 as uuid } from 'uuid'

@Injectable()
export class UsuarioService {
    private usuarioLista: UsuarioEntity[] = []

    async usuarios(): Promise<UsuarioEntity[]> {
        return this.usuarioLista
    }

    async usuario(email: string): Promise<UsuarioEntity> {
        return this.usuarioLista.find(user => user.email === email)
    }

    async salvar(usuario: UserCreateDto): Promise<UsuarioEntity> {
        const entity = new UsuarioEntity(usuario)
        this.usuarioLista.push(entity)

        return entity
    }
}

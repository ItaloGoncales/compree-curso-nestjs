import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { UserCreateDto } from './dtos/userCreate.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';

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

    async atualizar(id: string, dadosAtualizados: Partial<UserUpdateDto>): Promise<UsuarioEntity> {
        const userDb = this.usuarioLista.find(user => user.id === id);

        if (!userDb) throw new Error("User not found")

        Object.entries(dadosAtualizados).forEach(([key, value]) => {
            if (key === 'id') return

            userDb[key] = value
        })

        return userDb
    }
}

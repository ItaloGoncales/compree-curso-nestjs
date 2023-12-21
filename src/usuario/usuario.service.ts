import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
    private usuarioLista: any[]

    async usuarios(): Promise<any[]> {
        return this.usuarioLista
    }

    async salvar(usuario) {
        this.usuarioLista.push(usuario)
    }
}

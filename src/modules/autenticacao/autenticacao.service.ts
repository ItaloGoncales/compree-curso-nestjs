import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsuarioService } from '../usuario/usuario.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export interface UsuarioPayload {
  sub: string
  username: string
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.usuario(email)

    if (!usuario) {
      throw new UnauthorizedException(`O email ou a senha está incorreto`)
    }

    const autenticado = await bcrypt.compare(usuario.senha, senha)

    if (!autenticado) {
      throw new UnauthorizedException(`O email ou a senha está incorreto`)
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      username: usuario.nome,
    }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}

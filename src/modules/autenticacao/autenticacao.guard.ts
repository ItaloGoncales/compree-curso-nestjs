import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsuarioPayload } from './autenticacao.service'
import { Request } from 'express'

export interface RequestWithUser extends Request {
  usuario: UsuarioPayload
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const authorizationToken = request.headers.authorization
    if (authorizationToken) {
      const [tipo, token] = authorizationToken?.split(' ') ?? []

      if (tipo !== 'Bearer') {
        throw new BadRequestException('Authorization token precisa ser do tipo Bearer')
      }

      try {
        const payload: UsuarioPayload = await this.jwtService.verifyAsync(token)
        request.usuario = payload
        return true
      } catch (error) {
        throw new UnauthorizedException('JWT Inválido')
      }
    }
    throw new UnauthorizedException('Erro de autenticação')
  }
}

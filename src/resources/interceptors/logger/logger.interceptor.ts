import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { RequestWithUser } from '../../../modules/autenticacao/autenticacao.guard'
import { Request, Response } from 'express'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request | RequestWithUser>()
    const response = ctx.getResponse<Response>()

    const { path, method } = request
    const { statusCode } = response
    const initialTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - initialTime
        this.logger.log(`${method} ${path} - ${statusCode} - ${executionTime}ms`)

        if ('usuario' in request) {
          this.logger.log(`Rota acessada pelo usuário ${request.usuario.sub}`)
        }
      }),
    )
  }
}

import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common'
import { UsuarioModule } from './modules/usuario/usuario.module'
import { ProdutoModule } from './modules/produto/produto.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './modules/pedido/pedido.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './resources/filters/http-exception.filter'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module'
import { LoggerInterceptor } from './resources/interceptors/logger/logger.interceptor'

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PedidoModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 10 * 1000,
        }),
      }),
      isGlobal: true,
    }),
    AutenticacaoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    ConsoleLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}

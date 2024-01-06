import { Module } from '@nestjs/common'
import { UsuarioModule } from './modules/usuario/usuario.module'
import { ProdutoModule } from './modules/produto/produto.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './modules/pedido/pedido.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './resources/filters/http-exception.filter'
import { CacheModule } from '@nestjs/cache-manager'

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
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { UsuarioModule } from './usuario/usuario.module'
import { ProdutoModule } from './produto/produto.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './pedido/pedido.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'

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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

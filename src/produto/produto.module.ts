import { Module } from '@nestjs/common'
import { ProdutoController } from './produto.controller'
import { ProdutoService } from './produto.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProdutoEntity } from './produto.entity'
import { ProdutoImagemEntity } from './produto-imagem.entity'
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, ProdutoImagemEntity, ProdutoCaracteristicaEntity])],

  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}

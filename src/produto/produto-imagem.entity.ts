import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'url', nullable: false })
  url: string

  @Column({ name: 'url', length: 100, nullable: false })
  descricao: string
}

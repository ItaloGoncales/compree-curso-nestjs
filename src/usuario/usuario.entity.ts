import { UserCreateDto } from './dtos/userCreate.dto'
import { v4 as uuid } from 'uuid'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  constructor(userData: UserCreateDto) {
    this.id = uuid()
    this.nome = userData.nome
    this.email = userData.email
    this.senha = userData.senha
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string

  @Column({ name: 'email', length: 70, nullable: false })
  email: string

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string
}

import { UserCreateDto } from "./dtos/userCreate.dto"
import { v4 as uuid } from 'uuid'


export class UsuarioEntity {
    constructor(userData: UserCreateDto) {
        this.id = uuid()
        this.nome = userData.nome
        this.email = userData.email
        this.senha = userData.senha
    }

    id: string
    nome: string
    email: string
    senha: string
}
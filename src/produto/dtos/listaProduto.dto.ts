class ListaCaracteristicaProdutoDTO {
  nome: string
  descricao: string
}

class ListaImagemProdutoDTO {
  url: string
  descricao: string
}

export class ListaProdutoDTO {
  id: string
  nome: string
  valor: number
  quantidade: number
  descricao: string
  categoria: string
  caracteristicas: ListaCaracteristicaProdutoDTO[]
  imagens: ListaImagemProdutoDTO[]
}

import { useContext } from 'react'
import { CarrinhoContext } from '@/context/CarrinhoContext.jsx'

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext)

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === novoProduto.id,
    )

    if (!temOProduto) {
      novoProduto.quantidade = 1
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ])
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)
    setCarrinho([...carrinhoAtualizado])
  }

  function removerProduto(id) {
    const produto = carrinho.find((produto) => produto.id === id)
    const ehOUltimo = produto.quantidade === 1

    if (ehOUltimo) {
      return setCarrinho((carrinho) =>
        carrinho.filter((itemCarrinho) => itemCarrinho.id !== id),
      )
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1)
    setCarrinho([...carrinhoAtualizado])
  }

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemCarrinho) => {
      if (itemCarrinho.id === id) itemCarrinho.quantidade += quantidade
      return itemCarrinho
    })
  }

  function removerProdutoCarrinho(id) {
    const carrinhoAtualizado = carrinho.filter(
      (itemCarrinho) => itemCarrinho.id !== id,
    )
    setCarrinho(carrinhoAtualizado)
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
  }
}

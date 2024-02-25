import { useContext } from 'react'
import { CarrinhoContext } from '@/contexts/CarrinhoContext.jsx'
import {
  ADD_PRODUTO,
  REMOVE_PRODUTO,
  UPDATE_QUANTIDADE,
} from '@/reducers/carrinhoReducer.jsx'

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
})

const removeProdutoAction = (produtoID) => ({
  type: REMOVE_PRODUTO,
  payload: produtoID,
})

const updateQuantidadeAction = (produtoId, quantidade) => ({
  type: UPDATE_QUANTIDADE,
  payload: { produtoId, quantidade },
})

export const useCarrinhoContext = () => {
  const { dispatch, carrinho, quantidade, preco } = useContext(CarrinhoContext)

  function adicionarProduto(novoProduto) {
    dispatch(addProdutoAction(novoProduto))
  }

  function removerProduto(id) {
    const produto = carrinho.find((item) => item.id === id)

    if (produto && produto.quantidade > 1) {
      dispatch(updateQuantidadeAction(id, produto.quantidade - 1))
    } else {
      dispatch(removeProdutoAction(id))
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id))
  }

  return {
    carrinho,
    quantidade,
    preco,
    removerProduto,
    adicionarProduto,
    removerProdutoCarrinho,
  }
}

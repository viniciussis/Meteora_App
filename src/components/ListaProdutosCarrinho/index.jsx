import React, { useContext } from 'react'
import ItemCarrinhoSuspenso from '@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso'
import ItemCarrinho from '@/components/ItemCarrinho'
import { useLocation } from 'react-router-dom'
import { useCarrinhoContext } from '@/hooks/useCarrinhoContext.jsx'

const ListaProdutosCarrinho = ({ carrinho }) => {
  const location = useLocation()
  const { removerProduto, adicionarProduto, removerProdutoCarrinho } = useCarrinhoContext()

  return (
    <ul className="list-unstyled">
      {carrinho.length === 0 ? (
        <p className="text-center my-5">Não há produtos no carrinho</p>
      ) : (
        carrinho.map((itemCarrinho) => {
          return location.pathname === '/carrinho' ? (
            <ItemCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} />
          ) : (
            <ItemCarrinhoSuspenso
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              removerProduto={removerProduto}
              adicionarProduto={adicionarProduto}
              removerProdutoCarrinho={removerProdutoCarrinho}
            />
          )
        })
      )}
    </ul>
  )
}

export default ListaProdutosCarrinho

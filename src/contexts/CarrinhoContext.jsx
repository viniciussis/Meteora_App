import { createContext, useEffect, useMemo, useReducer, useState } from 'react'
import { CarrinhoReducer } from '@/reducers/carrinhoReducer'

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'Carrinho'

const estadoInicial = []

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(CarrinhoReducer, estadoInicial)
  const [quantidade, setQuantidade] = useState(0)
  const [preco, setPreco] = useState(0)

  const { quantidadeTemp, precoTemp } = useMemo(() => {
    return carrinho.reduce(
      (acumulador, itemCarrinho) => ({
        quantidadeTemp: acumulador.quantidadeTemp + itemCarrinho.quantidade,
        precoTemp:
          acumulador.precoTemp + itemCarrinho.preco * itemCarrinho.quantidade,
      }),
      {
        quantidadeTemp: 0,
        precoTemp: 0,
      },
    )
  }, [carrinho])

  useEffect(() => {
    setPreco(precoTemp)
    setQuantidade(quantidadeTemp)
  })

  return (
    <CarrinhoContext.Provider
      value={{
        dispatch,
        carrinho,
        quantidade,
        preco,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

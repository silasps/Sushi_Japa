import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { priceFormat } from "../utils/priceFormat";

export const CartContext = createContext({})

export const CartProvider = ({ children }) => {

  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState({
    total: 0,
    totalFormatted: "R$ 0,00"
  })

  const addProductInCart = (data) => {

    const item = {
      ...data,
      subTotal: data.product.price * data.quantity,
      subTotalFormatted: priceFormat(data.product.price * data.quantity),
      itemId: uuidv4()
    }

    setCart([...cart, item])
    alert('Produto adicionado ao carrinho')
    navigate('/')
  }

  useEffect(() => {
    const calc = cart.reduce(
      (acc, item) => Number(item.subTotal) + acc, 0)

    setTotal(
      {
        total: calc,
        totalFormatted: priceFormat(calc)
      }
    )

  }, [cart])

  return (
    <CartContext.Provider value={{
      cart,
      addProduct: addProductInCart,
      totalCart: total
    }}>
      {children}
    </CartContext.Provider>
  )
}
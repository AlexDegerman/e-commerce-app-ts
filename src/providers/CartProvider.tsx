import { type FC, type ReactNode, useEffect, useState } from "react"
import CartContext from "../contexts/CartContext"
import { type Product } from "../types/Product"

interface CartProviderProps {
  children: ReactNode
}
export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]") as Product[]
  const [cartItems, setCartItems] = useState(storedCartItems)

  const addToCart = (product: Product): void => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, product]
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId)
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}
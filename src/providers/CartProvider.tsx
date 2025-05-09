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
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      let updatedItems: Product[]
      
      if (existingItemIndex >= 0) {
        updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + (product.quantity || 1)
        }
      } else {
        const newItem: Product = {
          ...product,
          quantity: product.quantity || 1
        }
        updatedItems = [...prevItems, newItem]
      }
      
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

  const updateCartItemQuantity = (productId: number, newQuantity: number): void => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity }
        }
        return item
      })
      localStorage.setItem("cartItems", JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const clearCart = (): void => {
    setCartItems([])
    localStorage.removeItem("cartItems")
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider value={{ 
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
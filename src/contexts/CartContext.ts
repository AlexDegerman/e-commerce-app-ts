import { createContext } from "react"
import { type Product } from "../types/Product"

export interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, newQuantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export default CartContext
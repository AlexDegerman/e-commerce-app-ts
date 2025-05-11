import { persist } from "zustand/middleware"
import type { Product } from "../types/Product"
import { create } from "zustand"

interface CartState {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, newQuantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

       // Adds a product to the cart or updates quantity if it already exists
      addToCart: (product: Product) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === product.id)
          
        if (existingItemIndex >= 0) {
          const updatedItems = [...state.cartItems]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: (updatedItems[existingItemIndex].quantity || 1) + (product.quantity || 1)
          }
          return { cartItems: updatedItems }
        } else {
          const newItem: Product = {
            ...product,
            quantity: product.quantity || 1
          }
          return { cartItems: [...state.cartItems, newItem] }
        }
      }),

      // Removes a product from the cart by its ID
      removeFromCart: (productId: number) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId)
      })),

         // Updates the quantity of a specific cart item
      updateCartItemQuantity: (productId: number, newQuantity: number) => set((state) => ({
        cartItems: state.cartItems.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      })),

      // Clears all items from the cart
      clearCart: () => set({ cartItems: []})
    }),
    {
      name: 'cart-storage',
    }
  )
)
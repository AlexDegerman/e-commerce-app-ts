import { createContext } from "react"
import type { ProductMap } from "../types/ProductMap"

export interface ProductContextType {
  products: ProductMap
}

const ProductContext = createContext<ProductContextType | null>(null)

export default ProductContext
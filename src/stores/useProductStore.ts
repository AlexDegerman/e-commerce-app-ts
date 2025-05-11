import electronics from "../data/electronics.json"
import clothing from "../data/clothing.json"
import homeDecor from "../data/homeDecor.json"
import sportsOutdoors from "../data/sportsOutdoors.json"
import beauty from "../data/beauty.json"
import toys from "../data/toys.json"
import books from "../data/books.json"
import groceries from "../data/groceries.json"
import type { ProductMap } from "../types/ProductMap"
import type { Product } from "../types/Product"
import { create } from "zustand"

interface ProductState {
  products: ProductMap
}

const allProducts: ProductMap = {
  Electronics: electronics as Product[],
  Clothing: clothing as Product[],
  "Home Decor": homeDecor as Product[],
  "Sports & Outdoors": sportsOutdoors as Product[],
  "Beauty & Personal Care": beauty as Product[],
  "Toys & Games": toys as Product[],
  Books: books as Product[],
  Groceries: groceries as Product[],
}

const useProductStore = create<ProductState>(() => ({
  products: allProducts,
}))

export default useProductStore
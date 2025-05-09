import type { Product } from "./Product";

export interface ProductMap {
  [category: string]: Product[]
}
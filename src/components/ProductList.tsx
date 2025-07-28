import { useMemo, useState } from "react"
import type { Product } from "../types/Product"
import { Link } from "react-router-dom"
import useProductStore from "../stores/useProductStore"

const categories: string[] = ["All", "Electronics", "Clothing", "Home Decor", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Books", "Groceries"]


const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const { products } = useProductStore()

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(event.target.value)
  }

  const productsToDisplay = useMemo<Product[]>(() => {
    if (selectedCategory === "All") {
      return Object.values(products).flat()
    }
    return products[selectedCategory] || []
  }, [selectedCategory])

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Category Selector */}
      <div className="m-4">
        <label htmlFor="category-select" className="mr-2.5 font-medium text-gray-800">Filter by category: </label>
        <select 
          id="category-select" 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          className="px-3 py-2 border-2 border-purple-700 rounded bg-white text-gray-800 text-base cursor-pointer outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="p-2">
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {/* Grid of products on display */}
      <div className="grid grid-cols-4 w-[95%] max-w-[750px] min-w-[280px] max-sm:grid-cols-2">
        {productsToDisplay.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="block w-full h-full no-underline">
            <div className="bg-white shadow-sm p-2.5 rounded-lg max-w-[450px] text-gray-800">
              <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover rounded-lg max-sm:h-[100px]" />
              <h3 className="font-semibold">{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList
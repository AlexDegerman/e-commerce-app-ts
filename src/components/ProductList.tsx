import { useMemo, useState } from "react"
import "../styles/ProductList.css"
import type { Product } from "../types/Product"
import { Link } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"

const categories: string[] = ["All", "Electronics", "Clothing", "Home Decor", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Books", "Groceries"]


const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const { products } = useProduct()

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
    <div className="product-list">
      {/* Category Selector */}
      <div className="category-selector">
        <label htmlFor="category-select">Filter by category: </label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* Grid of products on display */}
      <div className="product-grid">
        {productsToDisplay.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList
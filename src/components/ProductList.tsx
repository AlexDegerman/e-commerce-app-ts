import electronics from "../data/electronics.json";
import clothing from "../data/clothing.json";
import homeDecor from "../data/homeDecor.json";
import sportsOutdoors from "../data/sportsOutdoors.json";
import beauty from "../data/beauty.json";
import toys from "../data/toys.json";
import books from "../data/books.json";
import groceries from "../data/groceries.json";
import { useMemo, useState } from "react";
import "../styles/ProductList.css";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

const categories: string[] = ["All", "Electronics", "Clothing", "Home Decor", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Books", "Groceries"]

const allProducts = {
  Electronics: electronics,
  Clothing: clothing,
  "Home Decor": homeDecor,
  "Sports & Outdoors": sportsOutdoors,
  "Beauty & Personal Care": beauty,
  "Toys & Games": toys,
  Books: books,
  Groceries: groceries,
}

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(event.target.value)
  }

  const productsToDisplay = useMemo<Product[]>(() => {
    if (selectedCategory === "All") {
      return Object.values(allProducts).flat()
    }
    return allProducts[selectedCategory] || []
  }, [selectedCategory])

    return (
    <div className="product-list">
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
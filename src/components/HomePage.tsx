import { useEffect, useState } from "react"
import promotedProducts from "../data/promotedProducts.json"
import featuredProducts from "../data/featuredProducts.json"
import "../styles/HomePage.css"
import { Link } from "react-router-dom"
import { type Product } from "../types/Product"

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  const typedPromotedProducts = promotedProducts as Product[]
  const typedFeaturedProducts = featuredProducts as Product[]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % typedPromotedProducts.length
        )
        setIsTransitioning(false)
      }, 400)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [typedPromotedProducts.length])

  return (
    <div className="home-page-container">
      <Link to={`/product/${typedPromotedProducts[currentIndex].id}`} className="product-link">
        <div
          className={`promoted-products-carousel ${isTransitioning ? 'carousel-transitioning' : 'carousel-visible'}`}
          style={{
            backgroundImage: `url(${typedPromotedProducts[currentIndex].image})`,
          }}
        >
          <div className="carousel-overlay">
            <h2>{typedPromotedProducts[currentIndex].name}</h2>
            <p>${typedPromotedProducts[currentIndex].price}</p>
          </div>
        </div>
      </Link>
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="featured-products-grid">
          {typedFeaturedProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/product-list" className="more-products"><p className="more-products-message">More products</p></Link>
      </div>
    </div>
  )
}

export default HomePage
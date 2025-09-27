import { useEffect, useState } from "react"
import promotedProducts from "../data/promotedProducts.json"
import featuredProducts from "../data/featuredProducts.json"
import { Link } from "react-router-dom"
import { type Product } from "../types/Product"

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  const typedPromotedProducts = promotedProducts as Product[]
  const typedFeaturedProducts = featuredProducts as Product[]

  // Change banner product every 5 seconds
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
    <div className="flex flex-col items-center w-[95%] max-w-[500px] min-w-[280px]">
      {/* Rotating Banner for Promoted Products */}
      <Link to={`/product/${typedPromotedProducts[currentIndex].id}`} className="block w-full h-full no-underline">
        <div
          className={`w-full h-[250px] flex items-center justify-center bg-cover bg-center relative transition-opacity duration-400 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `url(${typedPromotedProducts[currentIndex].image})`,
          }}
        >
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-5 text-center rounded-lg">
            <h2>{typedPromotedProducts[currentIndex].name}</h2>
            <p>${typedPromotedProducts[currentIndex].price}</p>
          </div>
        </div>
      </Link>
      
      {/* Grid for Featured Products */}
      <div className="featured-products w-full">
        <h2 className="text-black text-xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-3 max-sm:grid-cols-2 w-full">
          {typedFeaturedProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="block w-full h-full no-underline">
              <div className="bg-white shadow-sm p-2.5 rounded-lg max-w-[450px] text-gray-800">
                <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover rounded-lg max-sm:h-[100px]" />
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/product-list" className="text-lg no-underline text-center">
          <p className="m-2.5 text-black">More products</p>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
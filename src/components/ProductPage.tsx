import { useParams } from "react-router-dom"
import { CheckCircle, DollarSign, ShoppingCart, Truck } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "../stores/useCartStore"
import useProductStore from "../stores/useProductStore"

interface ProductPageParams {
  [key: string]: string | undefined
  index: string
}

const ProductPage = () => {
  const { index } = useParams<ProductPageParams>()
  const { products } = useProductStore()
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState<number>(1)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const product = Object.values(products)
  .flat()
  .find((p) => p.id === parseInt(index || "0"))

  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 3)
  const formattedDate = currentDate.toLocaleDateString()

  const stockAmount = Math.floor(Math.random() * (200 - 100 + 1)) + 100

  if (!product) {
    return <div className="not-found">Product not found</div>
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuantity(Number(e.target.value))
  }

const handleAddToCart = (): void => {
    addToCart({
      ...product,
      quantity: quantity
    })
    
    setShowNotification(true)
    
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  return (
    <div className="text-black bg-white pb-12">
      {/* Notification popup */}
      {showNotification && (
        <div className="fixed top-40 left-2/5 bg-purple-700 text-white px-6 py-3 rounded flex items-center gap-2 z-50 max-sm:top-40 max-sm:left-[2%] max-sm:px-4 max-sm:py-2">
          <CheckCircle color="white" size={16} />
          <span>{quantity}x {product.name} added to cart!</span>
        </div>
      )}
      
      {/* Product details and add to cart */}
      <h1 className="m-2.5 text-2xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover rounded-lg max-sm:h-[200px]" />
      
      <div className="flex justify-between max-sm:flex-col">
        <div className="w-[65%] pr-4 leading-relaxed text-gray-700 max-sm:w-full max-sm:p-0 max-sm:py-2.5">
          <p>{product.description}</p>
        </div>
        
        <div className="border border-gray-300 rounded-lg shadow-sm p-4 min-h-[130px] bg-gray-50 max-sm:w-full max-sm:p-0 max-sm:py-2.5">
          <p className="my-3 flex items-center gap-2">
            <DollarSign color="green" size="20px"/>
            <strong>Price: ${product.price}</strong>
          </p>
          <p className="my-3 flex items-center gap-2">
            <CheckCircle color="green" size="20px"/>
            Stock availability: {stockAmount}
          </p>
          <p className="my-3 flex items-center gap-2">
            <Truck color="blue" size="20px"/>
            Estimated delivery: {formattedDate}
          </p>
          
          <label htmlFor="quantity" className="mr-2">Quantity: </label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="px-2.5 py-2 border border-purple-700 rounded bg-white text-purple-700 font-medium cursor-pointer outline-none ml-2 hover:border-purple-600"
          >
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
          
          <p className="my-3 flex items-center gap-2">
            <ShoppingCart color="#5a2ca0" size="20px"/>
            <button 
              onClick={handleAddToCart} 
              className="cursor-pointer px-4 py-2.5 bg-purple-700 text-white border-none rounded font-bold hover:bg-purple-600"
            >
              Add to cart
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
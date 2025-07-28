import { Link } from "react-router-dom"
import { useCartStore } from "../stores/useCartStore"

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore()

  // Calculate total price of items in cart
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black">Your cart is empty!</div>
      </div>
    )
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm w-[95%] max-w-[750px] min-w-[280px] self-start mt-0">
      <h1 className="text-gray-800 text-3xl mb-5 border-b-2 border-gray-100 pb-2.5">Your Cart</h1>
      
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.name} className="h-25 object-cover rounded-lg mr-4 max-sm:h-auto max-sm:max-h-[150px]" />
          </Link>
          
          <Link to={`/product/${item.id}`} className="text-gray-800 text-lg flex-1 no-underline">
            <h3 className="max-sm:text-base">{item.name}</h3>
          </Link>
          
          <div className="flex flex-col items-end w-40 mr-4 max-sm:items-start max-sm:w-full">
            <p className="text-purple-700 font-bold text-lg m-0 mb-1 text-right">${item.price} each</p>
            <div className="text-sm text-gray-600 mb-1">Qty: {item.quantity || 1}</div>
            <div className="text-sm text-purple-700 font-bold">Subtotal: ${((item.price * (item.quantity || 1)).toFixed(2))}</div>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            className="bg-white text-purple-700 border border-purple-700 px-3 py-1.5 rounded cursor-pointer hover:bg-purple-50 hover:text-purple-600 max-sm:w-full"
          >
            Remove
          </button>
        </div>
      ))}
      
      <div className="flex">
        <button 
          className="mt-5 ml-auto bg-white text-purple-700 border border-purple-700 px-3 py-1.5 rounded cursor-pointer hover:bg-purple-50 hover:text-purple-600 max-sm:w-full" 
          onClick={clearCart}
        >
          Remove all
        </button>
      </div>
      
      <div className="mt-8 text-right pt-4 border-t-2 border-purple-700">
        <h3 className="text-gray-800 text-xl max-sm:text-lg">Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default Cart
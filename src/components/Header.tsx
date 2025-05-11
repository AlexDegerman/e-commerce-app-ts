import { useCartStore } from "../stores/useCartStore"
import "../styles/Header.css"
import { Link } from "react-router-dom"

const Header = () => {
  const {cartItems} = useCartStore()

  return (
    <div className="header">
      <Link to="/" className="header-link"><h1>eCommerceApp</h1></Link>
      <Link to="/product-list" className="header-link"><h2>Products</h2></Link>
      <Link to="/cart" className="header-link"><h2>Cart {cartItems.length > 0 && cartItems.length}</h2></Link>
    </div>
  )
}

export default Header
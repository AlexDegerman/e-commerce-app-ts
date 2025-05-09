import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div className="header">
      <Link to="/"><h1>eCommerceApp</h1></Link>
      <Link to="/product-list"><h2>Products</h2></Link>
      <h2>Cart</h2>
    </div>
  )
}

export default Header
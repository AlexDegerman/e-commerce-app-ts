import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import HomePage from './components/HomePage'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'

const App = () => {

  return (
    <div className="flex items-center justify-center flex-col text-white bg-gray-100 min-h-screen">
      <Header/>
      <div className="bg-white w-[95%] max-w-[750px] min-w-[280px] flex flex-col items-center min-h-[200px] flex-1">
        <Routes>
          <Route path="/product-list" element={<ProductList/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/:index" element={<ProductPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

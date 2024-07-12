
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
function App() {



  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/knitting' element={<ShopCategory banner={men_banner} category="knitting" />} />
          <Route path='/pottery' element={<ShopCategory banner={women_banner} category="pottery" />} />
          <Route path='/painting' element={<ShopCategory banner={kid_banner} category="painting" />} />
          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

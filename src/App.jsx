import React from 'react';
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SellerDashboard from './Pages/SellerDashboard';
import BuyerDashboard from './Pages/BuyerDashboard';
import Navbar from './Components/Navbar';



function App() {


  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/seller/profile" element={<SellerDashboard/>} />
    <Route path="/buyer/profile" element={<BuyerDashboard/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

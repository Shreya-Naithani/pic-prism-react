import React, { useEffect, useRef } from 'react'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import SellerDashboard from '../Pages/SellerDashboard'
import BuyerDashboard from '../Pages/BuyerDashboard'
import { Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap';
import {Toaster} from 'react-hot-toast'
import ProtectedRoutes from './ProtectedRoutes'

const GsapTransition = () => {
    const nodeRef =useRef(null);
    const location =useLocation();
    console.log(location);

    useEffect(()=>{
     if(nodeRef.current){
       gsap.fromTo(nodeRef.current ,{opacity:0},{opacity:1,duration:1})
     }
    },[location])

    // gsap:
    // 1. Target
    // 2. Logic
    

  return (
    <div ref={nodeRef}>
        <Toaster/>
      <Routes location={location}>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<ProtectedRoutes children={<Login/>} requiresAuth={false}/>} />
    <Route path="/signup" element={<ProtectedRoutes children={<Signup/>} requiresAuth={false}/>} />
    <Route path="/seller/profile" element={<ProtectedRoutes children={<SellerDashboard/>} />} />
    <Route path="/buyer/profile" element={<ProtectedRoutes children={<BuyerDashboard/>} />} />
   </Routes>
    </div>
  )
}

export default GsapTransition

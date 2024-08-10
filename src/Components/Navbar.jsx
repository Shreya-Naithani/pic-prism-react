import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useLocation } from 'react-router-dom'
import { logout,login } from '../Redux/Slices/authSlice';
import axios from 'axios';

const Navbar = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  const role = useSelector((state)=>state.auth.role);

const refreshToken = async()=>{
  try {
    const res = await axios.get('http://localhost:4000/api/refresh', {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem('refreshToken'),
      }
    })
    const data = await res.data;
    dispatch(login(data));
  } catch (error) {
    dispatch(logout());
  }
}

useEffect(()=>{
const Interval = setInterval(()=>{
refreshToken()
}, 1000 * 60 * 13)

return ()=> clearInterval(Interval)
},[])

  return (
    <nav className={`flex flex-col sm:flex-row justify-between px-5 py-5 items-start sm:items-center  ${pathname === "/seller/profile" || pathname === "/buyer/profile" ? "hidden" : "fixed"} top-0 right-0 left-0 shadow-md gap-1 sm:gap-0 z-30 bg-white`}>
      {/* logo and its name */}
      <div className='flex justify-between items-center'>
        <img src="/picprismlogo.png" className='w-[50px]' alt="prism_logo"/>
         <Link to="/" className='font-bold text-3xl'>PicPrism</Link>
      </div>
      {/* list of other tabs */}
      <ul className='flex gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0'>
       {/* <li>Home</li> */}
       <Link to="/" className='hover:text-gray-600 cursor-pointer sm:p-2'>About</Link>
       <Link to="/" className='hover:text-gray-600 cursor-pointer sm:p-2'>Contact</Link>
       {
        !isAuthenticated ? (<>
           <Link to="/login" className='hover:text-gray-600 cursor-pointer sm:p-2'>LogIn</Link>  
           <Link to="/signup" className='hover:text-gray-600 cursor-pointer sm:p-2'>SignUp</Link>
        </>) :(
          <Link to = {`/${role}/profile`} className='hover:text-gray-600 cursor-pointer sm:p-2'>Profile</Link>
        )
       }
      

      </ul>
    </nav>
  )
}

export default Navbar

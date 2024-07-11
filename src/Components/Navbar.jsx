import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex flex-col sm:flex-row justify-between px-5 py-5 items-start sm:items-center fixed top-0 right-0 left-0 shadow-md gap-1 sm:gap-0 z-30 bg-white'>
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
       <Link to="/login" className='hover:text-gray-600 cursor-pointer sm:p-2'>LogIn</Link>  
       <Link to="/signup" className='hover:text-gray-600 cursor-pointer sm:p-2'>SignUp</Link>

      </ul>
    </nav>
  )
}

export default Navbar
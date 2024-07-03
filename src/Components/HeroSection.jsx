import React from 'react';
import { IoMdSearch } from "react-icons/io";


const HeroSection = () => {
  return (
    <div className='sm:w-[60vw] h-[20vh] sm:rounded-3xl overflow-clip  mx-auto flex justify-center items-center'>
     <form className='absolute flex justify-center items-center '>
        <input className="py-5 px-3 w-[80vw] text-xl sm:text-3xl text-gray-800 mx-auto bg-bgColor outline-none border-b-2" type="search" id="search" placeholder='Search your assests...' name="search" />
        <IoMdSearch className='text-3xl sm:text-5xl text-gray-400 -ml-12'/>
     </form>
    </div>
  )
}

export default HeroSection

import React from 'react';
import {useSelector ,useDispatch} from 'react-redux';
import {RiMenu3Fill} from 'react-icons/ri';
import {IoClose} from 'react-icons/io5';
import {toggleSidebar} from '../Redux/Slices/navSlice';

const DashboardHeader = () => {
    const dispatch =useDispatch();
    const author = useSelector((state)=> state.auth.author);
    const role = useSelector((state)=> state.auth.role);
    const sidebar = useSelector((state)=> state.nav.sidebar);
  return (
    <>
      <div className='my-5 mx-8'>
      <h1 className='text-3xl font-bold'>hello {author?.charAt(0).toUpperCase() + author?.slice(1)},</h1>
      <p>Welcome to your {role} Dashboard</p>
      </div>
      {/* Hamburger icon for phone devices */}
      <RiMenu3Fill 
      onClick={()=>{dispatch(toggleSidebar())}}
       className={`${sidebar === true ? "hidden" : "block sm:hidden"} text-3xl absolute top-5 right-5`}/>
      <IoClose 
      onClick={()=>{dispatch(toggleSidebar())}}
      className={`${sidebar === true ? "block sm:hidden" : "hidden"} text-3xl absolute top-5 right-5`}/>
    </>
  )
}

export default DashboardHeader

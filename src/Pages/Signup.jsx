import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const Signup = () => {
  const[username,setUsername] = useState("");
  const[email ,setEmail] = useState("");
  const[password,setPassword] =useState(""); 
  const[accountType ,setAccountType] =useState("");
  const navigate =useNavigate();

const handleSignup = async(e)=>{
  e.preventDefault();
  try {
    // console.log("VITE_API_URL:", import.meta.env.VITE_API_URL)
    const res = await axios.post("http://localhost:4000/api/signup" ,{username,email,password,accountType});
    const data =await res.data;
    console.log(data);
    if(data.success){
      setUsername("")
      setEmail("")
      setPassword("")
      setAccountType("")
      toast.success(data.message);
      navigate('/login')
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

  return (
    <div className='mt-20 sm:mt-10 min-h-screen flex justify-center items-center w-full'>
      <div className='w-full sm:w-[50vw] md:w-[30vw] rounded-3xl shadow-md px-5 py-6 bg-white'>

      <h3 className='text-2xl font-bold text-center mb-4'>Lets connect!</h3>
      <form onSubmit={handleSignup}>
        {/* username */}
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="username">Username</label>
       <input className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black'
        type="text" 
        id="username" 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        name="username" 
        placeholder='@shreya' />
      
       {/* email */}
        </div>
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="email">Email Address</label>
       <input className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black'
        type="email"
         id="email" 
         name="email" 
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder='abc@gmail.com' />
        </div>
        
        {/* password */}
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="email">Password</label>
       <input className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black'
        type="password"
         id="password" 
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         name="password"
          placeholder='password' />
        </div>
       
        {/* for account Selection */}
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="accountType">Select Your Account Type</label>
       <select onChange={(e)=>setAccountType(e.target.value)} className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black'>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
       </select>
        </div>

        {/* Login with account */}
        <div className='flex justify-end items-center mb-2'>
        <Link className='text-sm text-black' to="/login">Log In with Account</Link>
        </div>

        <button className="flex w-full shadow-md text-sm font-medium text-white bg-black  px-4 py-2 justify-center items-center rounded-md" type='submit' >Signup</button>
      </form>
      </div>
    </div>
  )
}

export default Signup

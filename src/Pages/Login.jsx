import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const[email,setEmail] = useState("");
  const[password ,setPassword] = useState("");
  return (
    <div className='mt-20 sm:mt-10 min-h-screen flex justify-center items-center w-full'>
      <div className='w-full sm:w-[50vw] md:w-[30vw] rounded-3xl shadow-md px-5 py-6 bg-white'>

      <h3 className='text-2xl font-bold text-center mb-4'>Lets connect!</h3>
      <form>
        
       {/* email */}
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="email">Email Address</label>
       <input className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black' type="email" 
       id="email" 
       name="email"
       value={email}
       onChange={()=>setEmail(e.target.value)}
       placeholder='abc@gmail.com' />
        </div>
        
        {/* password */}
        <div className='mb-4'>
        <label className='block mb-2 text-gray-700 font-medium text-sm' htmlFor="email">Password</label>
       <input className='w-full px-3 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black'
        type="password" 
        id="password"
         name="password"
          value={password}
         onChange={()=>setEmail(e.target.value)}

         placeholder='password' />
        </div>
       
       {/* forgot password */}
       <a className='text-xs text-gray-600 hover:text-black' href="#">Forgot Password ?</a>
    
        {/* Login with account */}
        <div className='flex justify-end items-center mb-2'>
        <Link className='text-sm text-black' to="/signup">Create Account</Link>
        </div>

        <button className="flex w-full shadow-md text-sm font-medium text-white bg-black  px-4 py-2 justify-center items-center rounded-md" type='submit' >Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login

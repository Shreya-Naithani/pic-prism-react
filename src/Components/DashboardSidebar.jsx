import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import {setTab} from '../Redux/Slices/navSlice';
import { login, logout } from "../Redux/Slices/authSlice";
import axios from "axios";
import toast from 'react-hot-toast';

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.nav.sidebar);
  const tab = useSelector((state) => state.nav.tab);
  const author = useSelector((state) => state.auth.author);


  const switchProfile =async()=>{
    const res = await axios.get('http://localhost:4000/api/switch',{
      headers : {
        Authorization : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    const data = await res.data;
    console.log("switch profile :",data)
    toast.success(data.message);
    dispatch(login(data));
    navigate(`/${data.role}/profile`);
  };

  return (
    <div className={`fixed z-10 ${!sidebar == true ? "-translate-x-[500px] sm:translate-x-0" : "translate-x-0"} ease-in-out duration-300 flex sm:static text-lg font-semibold bg-white shadow-lg flex-col gap-2 w-fit min-h-screen p-3 list-none justify-between items-center `}>
      <div>
        {/* Circle with first letter of name */}
        <div className="bg-black my-5 rounded-full w-fit py-4 px-6 text-white">
          {author.charAt(0).toUpperCase()}
        </div>
        {/* list items */}
        <div className="flex flex-col gap-2">
          {pathname === "/seller/profile" ? (
            <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === 'photos-management' && " bg-black text-white" }`}
            onClick ={()=>{dispatch(setTab("photos-management"))}}
            >
              
              <IoMdPhotos /> Photo Management
            </li>
          ) : (
            <li   onClick ={()=>{dispatch(setTab("photo-purchased"))}} className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center  ${tab === 'photo-purchased' && " bg-black text-white" }`}>
            
              <IoMdPhotos /> Photo Purchased
            </li>
          )}
          <li  onClick ={()=>{dispatch(setTab("analytics"))}} className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center  ${tab === 'analytics' && " bg-black text-white" }`}>
            <SiGoogleanalytics /> Analytics
          </li>
          <li  onClick ={()=>{dispatch(setTab("orders"))}} className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center  ${tab === 'orders' && " bg-black text-white" }`}>
            <FaList /> Orders{" "}
          </li>
          <li  onClick ={()=>{dispatch(setTab("favourites"))}} className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center  ${tab === 'favourites' && " bg-black text-white" }`}>
            <IoIosHeart /> Favourites
          </li>
          <Link to="/" className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
            <AiFillHome /> Home
          </Link>
          <button onClick={switchProfile} className="w-full px-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-300 ease-linear gap-2 border-b-2 border-black text-center uppercase text-sm py-2"> Switch to {pathname === "/seller/profile" ? "buyer" : "seller"}</button>
        </div>
      </div>
      {/* logout button */}
      <li
        onClick={()=>{dispatch(logout())}}
        className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
      >
        
        <IoLogOut />
        Logout
      </li>
    </div>
  );
};

export default DashboardSidebar;

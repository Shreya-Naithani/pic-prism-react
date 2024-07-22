import React, { useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {logout} from '../../Redux/Slices/authSlice';
import {setMyPosts} from '../../Redux/Slices/postSlice';
import ImageCard from '../ImageCard';
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import {MdDelete} from 'react-icons/md';

const PhotoManagement = () => {
const posts = useSelector((state)=>state.posts.myPosts);
const dispatch = useDispatch();


const getmyPosts = async()=>{
  try {
    if(posts.length > 0) return;
    
     const res = await axios.get('http://localhost:4000/api/post/myPosts',{
      headers :{
        Authorization : "Bearer " + localStorage.getItem("accessToken"),
      }
     })
     const {data} = await res.data;
     dispatch(setMyPosts(data));
  } catch (error) {
    toast.error(error.response.data.error);
    dispatch(logout())
  }
}

useEffect(()=>{
getmyPosts();
},[])

  return <div className="flex flex-col sm:flex-row">
<div>
    {/* Dashboard header will be here */}
    <DashboardHeader/>
    {/* Image add component will be here */}
    <ImageAdd/>
</div>

{/* section where all the images are displayed */}
<div className="grid grid-cols-1  gap-5 mt-5 bg-transparent sm:bg-white p-5 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
  {
    posts.length >0 &&
    posts?.map(({_id ,title , image , author,price})=>(
      <ImageCard key={_id} id={_id} title={title} image={image} author={author} price={price} icon1={<BiSolidMessageSquareEdit title="Edit"
      className = "text-3xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"/>} icon2={<MdDelete title="Delete" className = "text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"/>}/>
    )

    )
  }

</div>

  </div>
};

export default PhotoManagement;

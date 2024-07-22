import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import useUpload from '../Hooks/useUpload';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';

const ImageAdd = () => {
    const[image,setImage] =useState(null);
    const[progress,setProgress]=useState(0);
    const author = useSelector((state)=>state.auth.author);

const handleImageChange=(e)=>{
const file = e.target.files[0];
setImage(file);
}

const onUploadProgress =(progressEvent)=>{
const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
setProgress(progress);
}

const addPost = async(e)=>{
e.preventDefault();
try {
    const title = e.target.title.value;
    const price = e.target.price.value;
    if(!title || !price){
        toast.error("All fields are required");
    }
    if(title.trim === ""|| price.trim === ""){
        toast.error("All fields are required");
    }

    const {public_id , url} = await useUpload({image,onUploadProgress})
  
    if(!public_id || !url){
        return toast.error("Image upload failed");
    }
    const res = await axios.post("http://localhost:4000/api/post/create" ,{
        title,
        price,
        image:url,
        publicId :public_id,
        author: author
    },{
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("accessToken"),
        },
    });
    const data =await res.data;
    // console.log(data);
    if(data.success === true){
        toast.success(data.message);
        e.target.reset();
        setImage(null);
        setProgress(0);
    }
} catch (error) {
   return toast.error(error.message);
}
}

  return (
    <div className='p-5 bg-white mx-9 rounded-2xl shadow-md'>
      <h2 className='text-xl font-bold'>Add new Products</h2>
      <form onSubmit={addPost} className='grid grid-cols-1 gap-2 my-4'>
        <img 
        className='w-[350px] h-[25vh] sm:h-[30vh] rounded-lg object-cover'
        src={`${image? URL.createObjectURL(image) : "https://dummyimage.com/600x400/d4d4d4/ffffff?text=No%20Image"}`} alt="this picture"/>

        {/* show progress bar */}
         {
            progress > 0 && <ProgressBar completed={progress} bgColor='black' transitionTimingFunction='ease-in-out'/>
         }


        <div className='flex flex-col'>
            <label htmlFor='image' className='font-bold'>Image</label>
            <input onChange={handleImageChange} className="rounded-lg border outline-none px-3 py-1 mt-1" type="file" name="image" id="image"/>
        </div>
        <div className='flex flex-col'>
            <label htmlFor='title' className='font-bold'>Title</label>
            <input className="rounded-lg border outline-none px-3 py-1 mt-1" type="text" required name="title" id="title"
            placeholder='Beautiful flower'
            />
        </div>
        <div className='flex flex-col'>
            <label htmlFor='price' className='font-bold'>Price</label>
            <input className="rounded-lg border outline-none px-3 py-1 mt-1" type="text" required name="price" id="price"
            placeholder='45'
            />
        </div>
        <button className='px-3 py-1 bg-black text-white font-semibold rounded-lg mt-2 w-fit' type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default ImageAdd

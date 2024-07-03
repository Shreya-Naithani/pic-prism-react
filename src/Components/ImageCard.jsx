import React from 'react';


const ImageCard = ({id,img,title,author,price,icon1,icon2}) => {
  return (
    <div className='rounded-lg bg-white shadow-lg p-2'>
    <div className='w-full h-[200px] overflow-hidden rounded-2xl'>
        <img className="w-full h-full hover:scale-105 transition-all duration-300  ease-linear  transform cursor-pointer" src={img} alt={title}/>
    </div>
    <p className='font-semibold text-white  bg-black w-fit rounded-full px-5 text-sm mt-3 py-1'>{"@"+author.charAt(0).toUpperCase() +author.slice(1)}</p>
    <div className='flex justify-between items-center mt-2'>
        <div>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <p className='text-gray-500'>Price : ${price}</p>
        </div>
        <div className='flex justify-center items-center gap-5'>
        {icon1}
       {icon2}
        </div>
    </div>
   </div> 
  )
}

export default ImageCard

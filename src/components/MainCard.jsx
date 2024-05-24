import React from 'react'
import arrow from '../asset/arrow.png'
function MainCard() {
  return (
    <div className='w-64 h-96 relative group'>
        <div className='absolute top-0 left-0 pt-5 z-10 w-full h-full bg-white border border-orange-200 rounded-lg shadow-2xl shadow-orange-300/40 p-3 flex flex-col items-center'>
            <div className='w-full h-1/2 flex justify-center'>
                <img className='w-3/4 h-full m-0.5 rounded-full object-cover shadow-2xl shadow-orange-300/30' src='https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'/>
            </div>
            <h1 className='text-xl font-bold text-slate-500 mt-2'>Food Name</h1>
            <div className='w-full flex justify-between px-5'>
                <h2 className='text-lg font-normal text-green-400'>$ 10.00</h2>
                <h2 className='text-lg font-normal text-amber-300'>4.3</h2>
            </div>
            <div className='w-full h-1/2 mt-1'>
                <h1 className='text-lg font-medium text-slate-500'>Restaurant Name</h1>
                <h2 className='text-md font-thin text-gray-400'>Location</h2>
            </div>
        </div>
        <h1 className='w-fit px-2 text-center text-lg absolute z-10 rounded-tl-lg rounded-br-lg text-white bg-orange-400/80 shadow-lg shadow-orange-300'>Best Seller</h1>
        <div className='absolute w-full cursor-pointer h-1/2 group/item  bottom-0 right-0 group-hover:rotate-45 origin-bottom-right rounded-lg flex justify-end items-start group-hover:shadow-2xl group-hover:shadow-orange-300/90 transition-all duration-150'>
            <div className='text-xl cursor-pointer text-amber-400 w-1/2 mt-5 -mx-2 -rotate-45 flex flex-col items-center justify-end  gap-1'>Order Here <img src={arrow} className='w-8 h-8 group-hover/item:-rotate-45 transition-all'/></div>
        </div>
    </div>
  )
}

export default MainCard
import React from 'react'
import {motion} from 'framer-motion'
function Setting() {
  return (
    <div className='w-full h-[88%] rounded-lg px-10'>
        <h1 className='text-2xl font-medium text-amber-400'>Settings</h1>
        <div className='w-full h-full min-h-screen rounded-xl bg-slate-50 p-4 flex items-start justify-center'>
            <div className='w-1/2 h-fit py-2 bg-white drop-shadow-lg border rounded-xl flex flex-col px-10 gap-4'>
                <label className='text-xl font-medium'>Restaurant Name</label>
                <input className='w-full h-10 border rounded-md p-2' />
                <label className='text-xl font-medium'>Email</label>
                <input className='w-full h-10 border rounded-md p-2' />
                <label className='text-xl font-medium'>Phone Number</label>
                <input className='w-full h-10 border rounded-md p-2' />
                <label className='text-xl font-medium'>Address</label>
                <input className='w-full h-10 border rounded-md p-2' />
                <label className='text-xl font-medium'>Password</label>
                <input className='w-full h-10 border rounded-md p-2' />
                <motion.button whileTap={{ scale: 0.9 }} className='w-full h-fit p-2 bg-amber-400 text-white text-xl rounded-xl'>Save</motion.button>
            </div>
        </div>
    </div>
  )
}

export default Setting
// import React from 'react'
// import { Link } from 'react-router-dom'
// import bgvideo from '../asset/bgvideo.mp4'

// function RegisterRestaurant() {
//   return (
//     <div className='w-screen h-full min-h-screen relative object-cover flex justify-end items-center'>
//         {/* <img className='w-full h-full' src='https://img.freepik.com/free-photo/smiling-waiter-standing-with-arms-crossed-cafa-c_1170-606.jpg?w=826&t=st=1715584695~exp=1715585295~hmac=c9c6d7c3bf21494850df6c516b49af134dd58fd35e6a9ef988e91f5da8328c8c'/> */}
//         <video className='w-screen h-full object-cover' src={bgvideo} autoPlay loop muted/>
//         <div className='w-1/2 h-5/6 rounded-xl min-h-screen absolute bg-black/40 backdrop-blur-2xl mt-5 mx-10'>
//             <div className='w-full h-1/6 flex justify-center items-center'>
//                 <h1 className='text-4xl font-bold text-amber-400'>Register Your Restaurant</h1>
//             </div>
//             <div className='w-full h-full flex justify-center items-start'>
//                 <form className='w-3/4 h-5/6 flex flex-col justify-around items-center'>
//                 <input type='text' placeholder='Restaurant Name' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5'/>
//                 <input type='text' placeholder='Restaurant Address' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5'/>
//                 <input type='text' placeholder='Restaurant Phone Number' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5'/>
//                 <input type='text' placeholder='Restaurant Email' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5'/>
//                 <input type='text' placeholder='Restaurant Website' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5'/>
//                 <input type='file' placeholder='Restaurant Image' className='w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5 py-2'/>
//                 <Link to='/admin' className='w-3/4 h-12 mb-5 bg-amber-400 rounded-xl text-2xl text-white font-bold'><button className='w-full h-full text-center' >Register</button></Link>
//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default RegisterRestaurant





import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import bgvideo from '../asset/bgvideo.mp4';

function RegisterRestaurant({ close }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    address: '',
    phoneno: '',
    email: '',
    description: '',
    pic: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pic: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
  
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup/res', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response status:', res.status);
  
      if (!res.ok) {
        throw new Error('Failed to register restaurant');
      }
  
      const data = await res.json();
      console.log('Restaurant registration successful:', data);
      navigate('/admin')
      // Handle successful registration
    } catch (error) {
      console.error('Error during restaurant registration:', error);
      // Handle error during registration
    }
  };
  
  

  return (
    <div className="w-screen h-full min-h-screen relative object-cover flex justify-end items-center" style={{ position: 'relative' }}>
      <video className="w-screen h-full object-cover" src={bgvideo} autoPlay loop muted />
      <div className="w-1/2 h-5/6 rounded-xl min-h-screen absolute bg-black/40 backdrop-blur-2xl mt-5 mx-10">
        <div className="w-full h-1/6 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-amber-400">Register Your Restaurant</h1>
        </div>
        <div className="w-full h-full flex justify-center items-start">
          <form className="w-3/4 h-5/6 flex flex-col justify-around items-center">
            {/* Input fields */}
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="userName"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Restaurant Address"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneno"
              placeholder="Restaurant Phone Number"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.phoneno}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Restaurant Email"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Restaurant description"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pic"
              placeholder="Restaurant Image"
              className="w-full placeholder-white focus:ring-amber-400 outline-none ring ring-transparent text-white h-12 bg-slate-100/50 rounded-xl px-5 py-2"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit} className="w-3/4 h-12 mb-5 bg-amber-400 rounded-xl text-2xl text-white font-bold">
                Register
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterRestaurant;

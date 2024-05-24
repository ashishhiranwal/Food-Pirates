
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/features/authSlice';
import { useNavigate } from 'react-router-dom';

function Login({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleClose = () => {
    close(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to sign in');
      }

      // Handle success response
      const userData = await res.json();
      console.log('Signin successful:', userData);
      dispatch(login({userData}));
    } catch (error) {
      console.error('Signin error:', error.message);
      // Handle and display the error to the user
    }
    // Handle form submission, e.g., send data to backend for authentication
    console.log('Form submitted:', { email, password });
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    close(false);
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50'>
      <motion.form
        exit={{ opacity: 0, y: 100 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 10 }}
        className='w-1/2 p-4 bg-[#f9f7f3dd] backdrop-blur-md shadow-xl drop-shadow-xl rounded-xl flex flex-col gap-4 bottom-2'
        onSubmit={handleSubmit} // Add onSubmit handler to the form
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-base font-medium text-center bg-orange-200 rounded-full py-2 px-4 w-fit'>
            Login
          </h1>
          <div onClick={handleClose}>
            <FaTimes className='text-3xl text-[#ff3333] cursor-pointer' />
          </div>
        </div>
        <label htmlFor='email' className='flex flex-col gap-1'>
          <h2 className='text-[#eac158] pl-1 text-xl'>Email</h2>
          <input
            type='email'
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Handle input change
            className='p-4 rounded-xl border-2 border-[#eac158] bg-[#fbfada20] outline-none text-white'
            placeholder='Enter email'
            required
          />
        </label>
        <label htmlFor='pass' className='flex flex-col gap-1'>
          <h2 className='text-[#eac158] pl-1 text-xl'>Password</h2>
          <input
            type='password'
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Handle input change
            className='p-4 rounded-xl border-2 border-[#eac158] bg-[#fbfada20] outline-none text-white'
            placeholder='Set password'
            required
          />
        </label>
        <button
          type='submit'
          className='bg-orange-500 text-white font-medium py-4 px-8 rounded-full mt-4 opacity-90 hover:opacity-100'
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
}

export default Login;

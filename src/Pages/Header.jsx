import React, { useEffect } from 'react';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Signin from './Signin';
import { useSelector,useDispatch } from 'react-redux';
import { login, logout } from '../store/features/authSlice';


export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen,setIsSignUpOpen]=useState(false);
  const userData=useSelector((state)=>state.auth).userData;
  const userLogged=useSelector((state)=>state.auth).status;
  const [restaurant,setRestaurant]=useState(null);
  const dispatch=useDispatch();
  const handlelogout=()=>{
    dispatch(logout());
  };
  console.log(userLogged,userData)
  useEffect(() => {
        const fetchRestaurants = async () => {
            try {
              const res = await fetch('http://localhost:3000/api/restaurants/getAllRestaurants', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
              if (!res.ok) {
                throw new Error('Failed to fetch restaurants');
              }
              const data = await res.json();
              const resData=data.filter((item)=>item.email===userData.email);
              setRestaurant(resData)
              dispatch(login({userData,resData:resData}));
            } catch (error) {
              console.error('Error fetching restaurants:', error.message);
              // Handle and display the error to the user
            }
          };
          if(userData)fetchRestaurants();
    }, [userData])
  
  return (

    <header className="relative">
      <div className='w-screen h-20 flex justify-around items-center mt-1 fixed z-50'>
        <div className=' w-5/6 h-16 ml-2 bg-slate-100/50 backdrop-blur-lg rounded-xl flex justify-between items-center px-10 shadow-[inset_-12px_-8px_40px_#FFE9C1]'>
          <div className='w-fit h-full flex gap-2 justify-center items-center'>
            <img src='https://img.icons8.com/ios/50/000000/food.png' alt='logo' className='w-8 h-8' />
            <h1 className='text-2xl font-bold text-slate-400'>FOOD<span className='text-amber-400'>PIRATES</span></h1>
          </div>
          <div className='flex gap-5'>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              {(userData&&!restaurant)&&<li>
                <NavLink
                  to="/registerrestaurant"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Register Restaurant
                </NavLink>
              </li>}
              {(restaurant&&userData)&&<li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Your Restaurant
                </NavLink>
              </li>}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              
              </li>
              <li>
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Orders
                </NavLink>
              
              </li>

            </ul>
          </div>
        </div>
        <div className="flex items-center lg:order-2 w-1/6 me-4 gap-0 justify-center">
            {!userLogged?<><motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLoginOpen(true)}
             className="m-4 px-6 py-2 font-medium bg-orange-500 text-black w-fit  rounded-lg">
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSignUpOpen(true)}
            className=" px-6 py-2 font-medium bg-yellow-500 text-black w-fit  rounded-lg">
              Get Started
            </motion.button></>:
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                className=" px-6 py-2 font-medium bg-yellow-500 text-black w-fit  rounded-lg">
                  {userData&&userData.userName}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={handlelogout}
                className=" px-6 py-2 text-xl font-medium text-red-500  w-fit  rounded-lg">
                  logout
                </motion.button>
              </>
            }
        </div>
      </div>
      {isLoginOpen&&<div className='fixed top-0 z-50 bg-transparent'>
                  <Login close={setIsLoginOpen} />
      </div>}
      {isSignUpOpen&&<div className='fixed top-0 z-50 bg-transparent'>
                  <Signin close={setIsSignUpOpen} />
      </div>}
    </header>

  );
}

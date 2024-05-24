import React, { useState,useEffect } from 'react'
import EachItem from '../components/EachItem'
import { useDispatch, useSelector } from 'react-redux'
import shopcart from '../asset/shopcart.png'
import { motion,AnimatePresence } from 'framer-motion'
import paperbag from '../asset/paperbag.png'
import { Link, useParams,useNavigate } from 'react-router-dom'
import CartEachItem from '../components/CartEachItem'
import { emptyCart } from '../store/features/cartSlice'

function MenuPage() {
    const resId=useParams();
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cart = useSelector(state=>state.cart).items;
    const userData=useSelector(state=>state.auth).userData;
    const [isVisibile, setIsVisible] = useState(false);
    const [isUpdateCart, setIsUpdateCart] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [iscoupenOpen, setIsCoupenOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [menuItems,setMenuItems]=useState(null);
    const [resData,setResData]=useState(null);
    const orderData = {
        userId: userData&&userData._id,
        restaurantId: resId.id,
        items: cart,
        totalPrice: totalCost,
      };
    
      useEffect(()=>{
        const fetchMenu = async () => {
          try {
            const res = await fetch('http://localhost:3000/api/restaurants/getMenu', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ restaurantId: resId.id }),
            });
            if (!res.ok) {
              throw new Error('Failed to ');
            }
      
            // Handle success response
            const data = await res.json();
            console.log('Signup successful:', data);
            setMenuItems(data);
          } catch (error) {
            console.error('Signup error:', error.message);
            // Handle and display the error to the user
          }
        };
        const restaurantData = async () => {
            try {
              const res = await fetch('http://localhost:3000/api/restaurants/getRestaurant', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restaurantId: resId.id }),
              });
              if (!res.ok) {
                throw new Error('Failed to ');
              }
        
              // Handle success response
              const data = await res.json();
              console.log('Signup successful:', data);
              setResData(data.restaurant);
            } catch (error) {
              console.error('Signup error:', error.message);
              // Handle and display the error to the user
            }
          };
        fetchMenu();
        restaurantData();
      },[])
    const handleCheckout=async(e)=>{
        console.log('Submitting order...',orderData);

      try {
        const res = await fetch('http://localhost:3000/api/order/place-order', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
        },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) {
          throw new Error('Failed to place order');
        }

        // Handle success response
        const data = await res.json();
        console.log('Order placed successfully:', orderData);
        dispatch(emptyCart())
        navigate('/')
        // Update UI or show confirmation message
      } catch (error) {
        console.error('Error placing order:', error.message);
        // Handle and display the error to the user
      }
    };

    useEffect(() => {
        if(cart.length>1){
            setIsVisible(true);
            setIsUpdateCart(true);
            setTimeout(()=>setIsUpdateCart(false),100);
            setTotalCost(cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0));
        }else{
            setIsVisible(false);
        }
        
    },[cart]);

    const varients = {
        isupdate:{scale:1.3},
        isnormal:{scale:1},
        drop:{y:50,opacity:1},
      }
  return (
    <div className='w-screen min-h-screen h-full flex flex-col items-center justify-center relative'>
        <div className='w-44 h-32 fixed rounded-full right-20 top-56 z-10 flex flex-col-reverse items-center justify-between'>
            {isVisibile&&
            <AnimatePresence>
            <motion.div
                variants={varients}
                initial={{ x: 100, opacity: 0 }}
                animate={isUpdateCart?'isupdate':'isnormal'}
                whileInView={{ x: 0, opacity: 1}}
                whileHover={{ scale: 1.3 }}
                viewport={{ once: true, amount: 0.5 }}
            className='w-fit h-fit rounded-full flex items-center justify-center'>
                <img onClick={()=>{setIsCartOpen(true); setIsVisible(false)}} className='w-20 h-16 cursor-pointer' src={shopcart} alt='cart'/>
            </motion.div>
            </AnimatePresence>
            }
            <motion.div
                variants={varients}
                initial={{opacity: 0}}
                animate={isUpdateCart?'drop':''}
            >
                <div className='w-12 h-12 rounded-full'>
                    <img className='w-full h-full' src={paperbag}/>
                </div>
            </motion.div>
        </div>
        <div className='w-full h-72 relative'>
            <div className='w-full h-72 backdrop-blur-sm flex flex-col justify-end absolute gap-3 p-4'>
                <h1 className='text-white text-7xl'>{resData&&resData.name}</h1>
                <h2 className='text-gray-200 font-thin text-2xl'>{resData&&resData.description}</h2>
            </div>
            <img className='w-full h-full' src={resData&&resData.pic}/>
        </div>
        <div className=' w-11/12 h-full min-h-screen'>
            <div className='w-full px-10 flex justify-start gap-4 items-center mt-10'>
                <div className='w-fit h-10 flex gap-2 px-2 rounded-lg items-center  ring-2 ring-gray-200 cursor-pointer hover:ring-2 hover:ring-green-400 transition-all'>
                    <div className='w-4 h-4 rounded-full bg-green-400 shadow-2xl shadow-green-400'></div>
                    <h1 className='w-fit text-slate-400'>Veg</h1>
                </div>
                <div className='w-fit h-10 flex gap-2 px-2 rounded-lg items-center ring-2 ring-gray-200 cursor-pointer hover:ring-2 hover:ring-red-400 transition-all'>
                    <div className='w-4 h-4 rounded-full bg-red-400 shadow-2xl shadow-red-400'></div>
                    <h1 className='w-fit text-slate-400'>Non-Veg</h1>
                </div>
            </div>
            <div className='w-full flex flex-wrap justify-center items-center mt-10 mb-10 gap-4'>
                {
                    menuItems&&menuItems.map((menu,i)=>(
                        <EachItem key={i} menu={menu}/>
                    ))
                }
            </div>
        </div>
        {isCartOpen&&<div className='w-screen h-screen flex justify-center items-center fixed top-10'>
            <div className='w-1/2 h-5/6  bg-white shadow-2xl flex flex-col justify-center px-6 items-center rounded-lg'>
                <div className='w-full flex justify-between p-4 py-2  items-center'>
                    <h1 className='text-3xl font-meduim'>Cart</h1>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full text-xl shadow-md shadow-red-500 transition-all hover:text-2xl hover:scale-95 bg-red-400 cursor-pointer' onClick={()=>{setIsCartOpen(false);setIsVisible(true)}}>
                        <h1 className='text-white'>X</h1>
                    </div>
                </div>
                <div className='w-full mt-5 h-1/2 flex gap-10 items-center overflow-scroll'>
                    {
                        cart.filter(item=>item.quantity>0).map((item,index)=>(
                            <CartEachItem key={index} items={item}/>
                        ))
                    }
                </div>
                <div onClick={()=>(setIsCoupenOpen((prev)=>!prev))} className='w-full h-12 my-2 rounded-xl border-4 border-dashed flex justify-center items-center cursor-pointer relative'>
                    <h1 className='text-2xl font-thin text-gray-300 select-none'>Apply Coupon</h1>
                    {iscoupenOpen&&<div className='w-full h-44 bg-gray-100 absolute bottom-0 rounded-xl'></div>}
                </div>
                <div className='w-full h-fit flex justify-between items-center'>
                    <h1 className='text-2xl font-medium'>Total: ${totalCost}<span className=' font-thin text-xl italic text-gray-400 px-5'>including tax</span></h1>
                    <button onClick={handleCheckout} className='w-44 h-12 flex justify-center items-center bg-green-400 rounded-lg text-white font-medium'>Checkout</button>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default MenuPage
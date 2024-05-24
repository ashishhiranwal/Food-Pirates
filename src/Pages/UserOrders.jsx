import React,{useEffect, useState,useRef} from 'react'
import { motion } from 'framer-motion'  
import { useSelector } from 'react-redux';

function UserOrders() {

    const [trackOrder, setTrackOrder] = useState(false);
    const [orders,setOrders]=useState([])
    const [trackOrderDetails,setTrackOrderDetails]=useState(null);
    const userId=useSelector((state)=>state.auth).userData;

    useEffect(()=>{
        const fetchOrdersByUserId = async (userId) => {
            try {
              const res = await fetch("http://localhost:3000/api/order/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId:userId }),
              });
              if (!res.ok) {
                throw new Error("Failed to fetch orders");
              }
              const data = await res.json();
              console.log("Orders for user ID",":", data);
              setOrders(data.orders); // Return the fetched orders
              console.log(orders)
            } catch (error) {
              console.error("Error fetching orders:", error.message);
              return null;
            }
          };
          fetchOrdersByUserId(userId)

    },[userId])
  return (
    <>
    <h1 className='text-3xl font-normal text-center text-amber-400 pt-24'>Your Orders</h1>
    <div className='w-screen min-h-screen pt-4 px-5 relative flex flex-wrap gap-4'>
        {orders&&orders.map((order,index)=>(<div key={index} className='w-96 h-[29rem] px-4 shrink-0 rounded-xl bg-slate-50 drop-shadow-xl border'>
        <div className='w-full h-fit text-center py-2 border-b-2'>
                    <h1 className='text-xl font-normal text-center'>Order #{order._id.slice(19,23)}</h1>
                    <p className='text-md font-thin text-gray-600 text-center'>{order.createdAt.slice(0,10)}, {order.createdAt.slice(11,16)}</p>
                </div>
                <div className='w-full h-fit py-2 border-b-2'>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600'>Restaurant</p> <p>{order.restaurantName}</p></div>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600'>Est. Time</p> <p> 25min</p></div>
                </div>
                <div className='w-full h-32 overflow-scroll py-2 border-b-2'>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p>Item</p> <p>Quantity</p> <p>Price</p></div>
                    {order.items.slice(1,).map((item,index)=>(<div key={index} className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600  w-1/3 text-left'>{item.name}</p> <p className=' w-1/3 text-center'>{item.quantity}</p> <p className=' w-1/3 text-right'>40</p></div>))}
                </div>
                <div className='w-full h-fit py-2 border-b-2'>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p>Total Price</p> <p>{order.totalPrice}</p></div>
                </div>
                <div className='w-full h-fit flex gap-2 py-2'>
                    <motion.button
                        whileTap={{scale:0.8,boxShadow: 'inset -12px -8px 40px #60A5FA',color:'white'}}
                        onClick={()=>(setTrackOrder(true),setTrackOrderDetails(order))}
                     className='w-full h-10 ring-2 mt-2 ring-blue-400 text-blue-400 rounded-lg'>Track Order</motion.button>
                    <motion.button
                        whileTap={{scale:0.8,boxShadow: 'inset -12px -8px 40px #F87171',color:'white'}}
                     className='w-full h-10 ring-2 mt-2 ring-red-400 text-red-400 rounded-lg'>Cancel Order</motion.button>
                     </div>
        </div>))}
        {trackOrder&&<div className='w-screen h-screen absolute top-0 left-0 flex items-center justify-center'>
            <motion.div
                initial={{ y: 100,x:-100, opacity: 0 }}
                animate={{ y: -80,x:0, opacity: 1 }}
             className='w-3/4 h-fit bg-white border drop-shadow-lg rounded-xl p-2 mt-10'>
                <div className='w-full h-fit px-4 flex justify-between items-center'>
                    <h1 className='text-xl font-normal text-amber-400'>Track Order</h1>
                    <motion.button onClick={()=>setTrackOrder(false)} whileTap={{ scale: 0.9 }} className='w-fit p-2  text-red-400 text-xl rounded-xl'>close</motion.button>
                </div>
                <div className='w-full h-fit flex gap-2'>
                    <div className='w-1/2 h-fit px-5'>
                    <h1 className='text-xl font-medium text-amber-400 my-2'>Order Details</h1>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>OrderId :</h1>
                        <h2 className='text-lg font-medium'>#{trackOrderDetails._id.slice(19,23)}</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Restaurant :</h1>
                        <h2 className='text-lg font-medium'>{trackOrderDetails.restaurantName}</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Restaurant No:</h1>
                        <h2 className='text-lg font-medium'>9995559999</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Restaurant Address :</h1>
                        <h2 className='text-lg font-medium'>Near Lilawati Chowk, Delhi</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Est. Time :</h1>
                        <h2 className='text-lg font-medium'>25min</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Total :</h1>
                        <h2 className='text-lg font-medium'>{trackOrderDetails.totalPrice}</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Payment Method :</h1>
                        <h2 className='text-lg font-medium'>Cash</h2>
                    </div>
                    
                    </div>
                    <div className='w-1/2 h-fit px-5'>
                    <h1 className='text-xl font-medium text-amber-400 my-2'>Customer Details</h1>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Customer Name :</h1>
                        <h2 className='text-lg font-medium'>{userId.name}</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Contact No. :</h1>
                        <h2 className='text-lg font-medium'>{userId.phoneno}</h2>
                    </div>
                    <div className='w-full h-fit flex justify-start gap-3 items-center'>
                        <h1 className='text-lg text-gray-500 font-medium'>Delivery Address :</h1>
                        <h2 className='text-lg font-medium'>{userId.address}</h2>
                    </div>

                    </div>
                </div>
                <div className='w-full h-72 rounded-xl bg-slate-300'>
                    
                </div>
                </motion.div>
        </div>}
    </div>
    </>
  )
}

export default UserOrders
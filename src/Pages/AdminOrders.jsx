import React ,{useEffect, useState}from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

function AdminOrders() {
    const resData=useSelector(state=>state.auth).resData[0];
    const [orders,setOrders]=useState(null);
    const [data,setData]=useState(null);
    useEffect(()=>{
        const fetchOrdersByUserId = async (resId) => {
            try {
              const res = await fetch("http://localhost:3000/api/order/ordersByRestaurantId", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ restaurantId:resId }),
              });
              if (!res.ok) {
                throw new Error("Failed to fetch orders");
              }
              const data = await res.json();
              console.log("Orders for res ID",":", data.orders);
              setData(data.orders);
            } catch (error) {
              console.error("Error fetching orders:", error.message);
              return null;
            }
          };
          fetchOrdersByUserId(resData._id)

    },[resData._id])
    useEffect(()=>{
        const fetchUserDetails = async (orderId,userId,resId) => {
            try {
              const res = await fetch(`http://localhost:3000/api/order/userDetailsFromOrder`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId:orderId,restaurantId:resId,userId:userId }),
              });
              if (!res.ok) {
                throw new Error('Failed to fetch user details');
              }
              const data = await res.json();
              return data.user; // Assuming the user object is returned in the response
            } catch (error) {
              console.error('Error fetching user details:', error);
              return null; // Return null if user details fetch fails
            }
          };
        const traverseOrders = async () => {
            const updatedOrders = await Promise.all(
              data.map(async (order) => {
                const userDetails = await fetchUserDetails(order._id,order.userId,order.restaurantId);
                return { ...order, userDetails }; // Add userDetails to each order object
              })
            );
            setOrders(updatedOrders);
            console.log(updatedOrders);
          };
      
          traverseOrders();
    },[data,setData])
  return (
    <div className="w-full h-[88%] rounded-lg px-10">
        <h1 className="text-2xl font-medium text-amber-400">Orders</h1>
        <div className='w-full h-full flex gap-2 flex-wrap p-2'>
            {orders&&orders.map((order,index)=>(<div key={index} className='w-96 max-h-[29rem] h-fit bg-slate-50 px-3 border rounded-xl shadow-2xl'>
                <div className='w-full h-fit text-center py-2 border-b-2'>
                    <h1 className='text-xl font-normal text-center'>Order #{order._id.slice(19,23)}</h1>
                    <p className='text-md font-thin text-gray-600 text-center'>{order.createdAt.slice(0,10)}, {order.createdAt.slice(11,16)}</p>
                </div>
                <div className='w-full h-fit py-2 border-b-2'>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600'>Customer</p> <p>{order.userDetails.name}</p></div>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600'>Delivery Time</p> <p> 25min</p></div>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600'>Distance</p> <p> 2.5km</p></div>
                </div>
                <div className='w-full h-fit max-h-32 overflow-scroll py-2 border-b-2'>
                {order.items.slice(1,).map((item,index)=>(<div key={index} className='w-full h-fit flex justify-between items-center text-lg font-normal'><p className='text-gray-600  w-1/3 text-left'>{item.name}</p> <p className=' w-1/3 text-center'>{item.quantity}</p> <p className=' w-1/3 text-right'>40</p></div>))}
                </div>
                <div className='w-full h-fit py-2 border-b-2'>
                    <div className='w-full h-fit flex justify-between items-center text-lg font-normal'><p>Total</p> <p>140</p></div>
                </div>
                <div className='w-full h-fit flex gap-2 py-2'>
                    <motion.button
                        whileHover={{scale:0.95,boxShadow: 'inset -12px -8px 40px #60A5FA',color:'white'}}
                     className='w-1/2 h-10 ring-2 ring-blue-400 text-blue-400 rounded-lg'>Accept Order</motion.button>
                    <motion.button
                        whileHover={{scale:0.95, boxShadow: 'inset -12px -8px 40px #F87171',color:'white'}}
                     className='w-1/2 h-10 ring-2 ring-red-400 text-red-400 rounded-lg '>Decline Order</motion.button>
                </div>
            </div>))}
        </div>
    </div>
  )
}

export default AdminOrders
import React,{useState,useEffect} from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch} from 'react-redux';
import {motion} from 'framer-motion';
import { addToCart,removeFromCart } from '../store/features/cartSlice';


function EachItem({menu}) {
    const [Quantity, setQuantity] = useState(0);
    const [item, setItem] = useState({id:menu.id,quantity:Quantity,price:menu.price,name:menu.foodName,pic:menu.pic});
    const [shadow, setShadow] = useState('shadow-inner-orange');
    const shadows=['shadow-inner-orange','shadow-inner-pink','shadow-inner-green'];
    const dispatch = useDispatch();
    
    useEffect(() => {
        setShadow(shadows[Math.floor(Math.random()*shadows.length)]);
    }, [])
    const increment = () => {
        if(Quantity<10){
            setQuantity((prev)=>prev+1);
            setItem({...item,quantity:Quantity});
            dispatch(addToCart(item));
        }
    }
    const decrement = () => {
        if(Quantity>0){
            setQuantity((prev)=>prev-1);
            setItem({...item,quantity:Quantity});
            dispatch(removeFromCart(item));
        }
    }
    useEffect(() => {
        (
            async () => {
            const l = (await import("locomotive-scroll")).default;
            const LocotmotiveScroll = new l();
            }
        )()
        }, [])
  return (
    <>
        <div className={`w-80 h-64 sm:h-96 rounded-xl p-3 flex items-center flex-col ${shadow} drop-shadow-xl`}>
            <div className='w-full h-fit'>
                <div className='w-9 h-9 rounded-xl flex justify-center items-center border-2 '>
                    <div className={`w-4 h-4 rounded-full ${menu.category=='Veg'?'bg-green-400':'bg-red-400'}`}></div>
                </div>
            </div>
            <div className={`w-3/4 h-1/2 bg-slate-200 rounded-xl`}>
                <img className='w-full h-full object-cover rounded-xl' src={menu.pic} alt='food'/>
            </div>
            <div className='w-full h-1/2 flex flex-col justify-around items-center'>
                <h1 className='text-2xl font-medium text-slate-400'>{menu.foodName}</h1>
                <div className='w-full h-10 flex justify-between items-center'>
                    <h1 className='text-2xl w-1/4 font-thin select-none text-green-300'>${menu.price}</h1>
                    <div className='w-1/3 h-6 flex justify-between items-center'>
                        <motion.button
                            whileTap={{scale:1.2}}
                         onClick={decrement} className={`w-8 h-8 select-none bg-slate-50/20 flex justify-center items-center shadow-xl rounded-lg text-2xl`}>-</motion.button>
                        <h1 className='text-2xl font-thin text-slate-900 select-none'>{Quantity}</h1>
                        <motion.button 
                            whileTap={{scale:1.2}}
                        onClick={increment} className={`w-8 h-8 select-none bg-slate-50/20 flex justify-center items-center shadow-xl rounded-lg text-2xl`}>+</motion.button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EachItem
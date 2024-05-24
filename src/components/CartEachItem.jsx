// import React, { useEffect, useState } from 'react'

// function CartEachItem({item}) {
// const [shadow, setShadow] = useState('shadow-inner-orange');
// const shadows=['shadow-inner-orange','shadow-inner-pink','shadow-inner-green'];
// useEffect(() => {
//     setShadow(shadows[Math.floor(Math.random()*shadows.length)]);
// }, [])
//   return (
//     <div className='w-44 h-full flex flex-col gap-3'>
//         <div className={`w-44 h-3/4 rounded-full ${shadow} drop-shadow-xl shrink-0 flex flex-col justify-center items-center`}>
//             <div className='w-2/3 h-1/2 rounded-full object-cover'>
//                 <img className='w-full h-full rounded-full select-none' src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D' alt='food'/>
//             </div>
//             <div className='w-full h-1/4 flex flex-col justify-center items-center'>
//                 <h1 className='text-2xl font-medium text-amber-400'>Burger</h1>
//                 <h2 className='text-xl font-medium text-center text-green-600'>$10</h2>
//             </div>
//         </div>
//         <div className='w-44  flex justify-around bg-slate-50/50 p-2 items-center rounded-3xl'>
//             <div className='w-fit px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center'>
//                 <h1 className='font-medium text-amber-400 cursor-pointer select-none'>-</h1>
//             </div>
//             <div className='w-fit  px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center'>
//                 <h1 className='font-medium text-amber-400 select-none'>{item.quantity}</h1>
//             </div>
//             <div className='w-fit  px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center'>
//                 <h1 className='font-medium text-amber-400 cursor-pointer select-none'>+</h1>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CartEachItem]

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart,removeFromCart } from '../store/features/cartSlice';

function CartEachItem({ items }) {
  const dispatch=useDispatch();
  const [quantity, setQuantity] = useState(items.quantity);
  const [shadow, setShadow] = useState('shadow-inner-orange');
  const shadows = ['shadow-inner-orange', 'shadow-inner-pink', 'shadow-inner-green'];

  useEffect(() => {
    setShadow(shadows[Math.floor(Math.random() * shadows.length)]);
  }, []);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    const item={...items,quantity:quantity};
    dispatch(addToCart(item));
    // You can also update the quantity in the cart state here if needed
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      const item={...items,quantity:quantity};
      dispatch(removeFromCart(item));
      // You can also update the quantity in the cart state here if needed
    }
  };

  return (
    <div className='w-44 h-full flex flex-col gap-3'>
      <div className={`w-44 h-3/4 rounded-full ${shadow} drop-shadow-xl shrink-0 flex flex-col justify-center items-center`}>
        <div className='w-2/3 h-1/2 rounded-full object-cover'>
          <img className='w-full h-full rounded-full select-none' src={items.pic} alt='food' />
        </div>
        <div className='w-full h-1/4 flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-medium text-amber-400'>{items.name}</h1>
          <h2 className='text-xl font-medium text-center text-green-600'>${items.price}</h2>
        </div>
      </div>
      <div className='w-44  flex justify-around bg-slate-50/50 p-2 items-center rounded-3xl'>
        <div className='w-fit px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center' onClick={handleDecrement}>
          <h1 className='font-medium text-amber-400 cursor-pointer select-none'>-</h1>
        </div>
        <div className='w-fit  px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center'>
          <h1 className='font-medium text-amber-400 select-none'>{items.quantity}</h1>
        </div>
        <div className='w-fit  px-3 h-full bg-slate-50 rounded-lg text-2xl shadow-xl flex items-center justify-center' onClick={handleIncrement}>
          <h1 className='font-medium text-amber-400 cursor-pointer select-none'>+</h1>
        </div>
      </div>
    </div>
  );
}

export default CartEachItem;

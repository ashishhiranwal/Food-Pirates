import React,{useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';

function Menu() {
    const [showAddItem, setShowAddItem] = useState(false);
    const [menuItems,setMenuItems]=useState([]);
    const resData=useSelector(state=>state.auth).resData;
    console.log(resData);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category:'Veg',
        pic: "",
        resId:resData
      });
    useEffect(()=>{
      const fetchMenu = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/restaurants/getMenu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ restaurantId: resData[0]._id }),
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
      fetchMenu();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form...',resData);
    
        try {
          const res = await fetch('http://localhost:3000/api/restaurants/createMenuItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

    
          if (!res.ok) {
            throw new Error('Failed to sign up');
          }
    
          // Handle success response
          const data = await res.json();
          console.log('Signup successful:', data);
          setFormData({name:'',description: '',price: '',category:'Veg',pic: "",})
          setShowAddItem(false);
        } catch (error) {
          console.error('Signup error:', error.message);
          // Handle and display the error to the user
        }
      };
    const deleteMenu =async (id)=>{
        try {
          const res = await fetch('http://localhost:3000/api/restaurants/deletemenu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemId:id}),
          });
    
          if (!res.ok) {
            throw new Error('Failed to sign up');
          }
    
          // Handle success response
          const data = await res.json();
          console.log('Signup successful:', data);
          window.location.reload()
        } catch (error) {
          console.error('Signup error:', error.message);
          // Handle and display the error to the user
        }
    }
    const handleChange = (e) => {
        console.log(formData);
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  return (
    <div className="w-full h-[88%] rounded-lg px-10">
        <div className='w-full h-fit flex justify-between px-10 mt-5'>
            <h1 className="text-2xl font-medium text-amber-400">Menu</h1>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddItem(true)}
                className='w-fit px-3 py-2 ring-2 ring-blue-400 text-blue-400 rounded-xl'>Add Menu</motion.button>
        </div>
        <div className='w-full h-screen rounded-xl bg-slate-50 p-4 mt-5 overflow-scroll relative flex gap-10'>
            {menuItems&&menuItems.map((menu,index)=>(
            <div key={index} className='w-56 h-fit py-2 bg-white drop-shadow-lg border rounded-xl overflow-hidden'>
            <div className='w-56 h-72 overflow-hidden '>
                <div className='w-full h-3/4  rounded-xl p-4'>
                    <img src={menu.pic} className='w-full rounded-xl h-full object-cover' />
                </div>
                <div className='w-full h-fit flex justify-between items-center px-2'>
                    <h1 className='text-lg font-medium'>{menu.foodName}</h1>
                    <h1 className='text-lg font-medium text-green-500'>${menu.price}</h1>
                </div>
            </div>
            <div className='w-full px-2'>
                <motion.button whileTap={{ scale: 0.9 }} onClick={()=>(deleteMenu(menu.id))} className='w-full h-fit p-2 bg-red-400 text-white text-xl rounded-xl'>Delete</motion.button>
            </div>
            </div>
            ))}
            {showAddItem&&
            <div className='w-screen h-screen top-0 left-0 absolute flex items-center justify-center'>
            <motion.div
                initial={{ y: -100,x:-100, opacity: 0 }}
                animate={{ y: -120,x:-150, opacity: 1 }}
             className='w-1/2 h-fit bg-white drop-shadow-lg rounded-xl'>
                <div className='w-full h-fit px-4 flex justify-between items-center'>
                    <h1 className='text-xl font-normal text-amber-400'>Add Item</h1>
                    <motion.button whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAddItem(false)} 
                     className='w-fit p-2  text-red-400 text-xl rounded-xl'>close</motion.button>
                </div>
                <div className='w-full h-fit flex gap-2'>
                    <div className='w-1/2 h-fit p-4'>
                        <label className='text-lg font-medium'>Menu Name</label>
                        <input name='name' onChange={(e)=>(handleChange(e))} className='w-full h-10 border rounded-md p-2' />
                        <label className='text-lg font-medium'>Price</label>
                        <input name='price' onChange={(e)=>(handleChange(e))} className='w-full h-10 border rounded-md p-2' />
                        <label className='text-lg font-medium'>Description</label>
                        <input name='description' onChange={(e)=>(handleChange(e))} className='w-full h-10 border rounded-md p-2' />
                        <label className='text-lg font-medium'>Category</label>
                        <input name='category' onChange={(e)=>(handleChange(e))} className='w-full h-10 border rounded-md p-2' />
                        <label className='text-lg font-medium'>Image</label>
                        <input name='pic' onChange={(e)=>(handleChange(e))} type='text' className='w-full h-10 border rounded-md px-2 py-1' />
                        <motion.button whileTap={{ scale: 0.9 }} onClick={handleSubmit} className='w-full h-fit mt-3 p-2 bg-green-400 text-white text-xl rounded-xl'>Add</motion.button>
                    </div>
                    <div className='w-1/2 h-fit p-4'>
                        <div className='w-full h-80 bg-slate-50 border drop-shadow-xl rounded-xl'>
                            <div className='w-full h-3/4 rounded-xl p-4'>
                                <img src={formData.pic} className='w-full rounded-xl h-full object-cover' />
                            </div>
                            <div className='w-full h-fit flex justify-between items-center px-2'>
                                {formData.name!==''&&<h1 className='text-lg font-medium'>{formData.name}</h1>}
                                {formData.price!==''&&<h1 className='text-lg font-medium text-green-500'>${formData.price}</h1>}
                            </div>
                            <p className='text-sm w-full h-fit font-light px-2'>{formData.description}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            </div>}

        </div>
        
    </div>
  )
}

export default Menu
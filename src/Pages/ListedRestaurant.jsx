import React, { useEffect, useState } from 'react';
import MenuPage from './MenuPage'
import { Link, useParams } from 'react-router-dom'

function ListedRestaurant() {

    const [restaurants, setRestaurants] = useState([]);
    const resId=useParams();

    useEffect(() => {
    (
        async () => {
        const l = (await import("locomotive-scroll")).default;
        const LocotmotiveScroll = new l();
        })
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
              console.log(data);
              setRestaurants(data);
            } catch (error) {
              console.error('Error fetching restaurants:', error.message);
              // Handle and display the error to the user
            }
          };
          fetchRestaurants();
    }, [])

    


    const images=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674004585426-c6ad2adbe4c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"];
  return (
    <>
        <div className='w-full min-h-screen flex flex-wrap justify-center gap-10'>
            {
                restaurants.map((item,index)=>(
                    <Link to={`/menu/${item._id}`} key={index}><div
                        data-scroll
                        data-scroll-speed="0.10"
                     className='w-72 h-96 flex flex-col justify-center items-start py-4  relative'>
                        <div className='w-full h-3/4 rounded-lg absolute object-cover opacity-90'>
                        <img className='w-full h-full rounded-lg' src={item.pic}/>
                        </div>
                        <div className='w-full h-full rounded-lg  flex flex-col p-3 gap-2 absolute backdrop-blur-2xl'>
                            <div className='w-full h-3/4 bg-slate-50 rounded-lg object-cover'>
                                <img className='w-full h-full rounded-lg' src={item.pic}/>
                            </div>
                            <div className='w-full h-1/4 bg-gray-500/50 backdrop-blur-xl rounded-lg flex justify-between p-2'>
                                <div>
                                    <h1 className='text-2xl font-medium text-amber-400'>{item.name}</h1>
                                    <h2 className='text-xl font-thin text-white'>{item.description}</h2>
                                </div>
                            </div>
                        </div>
                    </div></Link>
                ))
            }
        </div>
    </>
  )
}

export default ListedRestaurant


// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import MenuPage from './MenuPage';

// function ListedRestaurant() {
//   useEffect(() => {
//     (async () => {
//       const l = (await import('locomotive-scroll')).default;
//       const LocotmotiveScroll = new l();
//     })();
//   }, []);

//   const images = [
//     // Your restaurant image URLs here
//   ];

//   return (
//     <>
//       <div className='w-full min-h-screen flex flex-wrap justify-center gap-10'>
//         {images.map((image, index) => (
//           <Link to='/menu' key={index}>
//             <div
//               data-scroll
//               data-scroll-speed='0.10'
//               className='w-72 h-96 flex flex-col justify-center items-start py-4  relative'
//             >
//               <div className='w-full h-3/4 rounded-lg absolute object-cover opacity-90'>
//                 <img className='w-full h-full rounded-lg' src={image} alt='Restaurant' />
//               </div>
//               <div className='w-full h-full rounded-lg  flex flex-col p-3 gap-2 absolute backdrop-blur-2xl'>
//                 <div className='w-full h-3/4 bg-slate-50 rounded-lg object-cover'>
//                   <img className='w-full h-full rounded-lg' src={image} alt='Restaurant' />
//                 </div>
//                 <div className='w-full h-1/4 bg-gray-500/50 backdrop-blur-xl rounded-lg flex justify-between p-2'>
//                   <div>
//                     <h1 className='text-2xl font-medium text-amber-400'>Restaurant Name</h1>
//                     <h2 className='text-xl font-thin text-white'>Restaurant Description</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }

// export default ListedRestaurant;

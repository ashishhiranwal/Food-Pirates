//  import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaXmark } from 'react-icons/fa6';

// function Signin({close}) {
//   const [Username,setUsername]=useState('')
//   const [Email,setEmail]=useState('')
//   const [Password,setPassword]=useState('')
//   const [Phone,setPhone]=useState('')
//   const [Address,setAddress]=useState('')
//   const handleClose = () => {
//     close(false);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting form...');
  
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/signup", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name:"fvghbj",
//           username: "tfyvgbh",
//           email: "tfygvbh@gamil.com",
//           password: "fghvbjh",
//           phoneno: "ctfyvgbh",
//           address: "fcfcvghbj",
//         }),
//       });
  
//       if (!res.ok) {
//         throw new Error('Failed to sign up');
//       }
  
//       // Handle success response
//       const data = await res.json();
//       console.log('Signup successful:', data);
//     } catch (error) {
//       console.error('Signup error:', error.message);
//       // Handle and display the error to the user
//     }
//   };
//   return (
//     <div className='w-screen h-screen relative flex justify-center items-center my-6'>
//       <motion.form
//         exit={{ opacity: 0, y: 100 }}
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, type: "spring", damping: 10 }}
//         className="w-1/2 p-4 bg-[#20201fdd] backdrop-blur-md shadow-xl drop-shadow-xl rounded-xl flex flex-col gap-4 bottom-2">
//         <div className="flex items-center justify-between">
//           <h1 className="text-base font-medium text-center bg-orange-200 rounded-full py-2 px-4 w-fit">
//             Sign Up
//           </h1>
//           <div onClick={handleClose}>
//           <FaXmark
//             className="text-3xl text-[#ff3333] cursor-pointer"
//           />
//           </div>
          
//         </div>
//         <label htmlFor="name" className="flex flex-col gap-1">
//           <h2 className="text-[#eac158] pl-1 text-xl">Username</h2>
//           <input
//             type="text"
//             className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
//             placeholder="Username"
//             value={Username}
//             onChange={(e)=>(setUsername(e.target.value))}
//             required
//           />
//         </label>
//         <label htmlFor="email" className="flex flex-col gap-1">
//           <h2 className="text-[#eac158] pl-1 text-xl">Email</h2>
//           <input
//             type="email"
//             className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
//             placeholder="Enter email"
//             value={Email}
//             onChange={(e)=>(setEmail(e.target.value))}
//             required
//           />
//         </label>
//         <label htmlFor="pass" className="flex flex-col gap-1">
//           <h2 className="text-[#eac158] pl-1 text-xl">Password</h2>
//           <input
//             type="password"
//             className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
//             placeholder="Set password"
//             value={Password}
//             onChange={(e)=>(setPassword(e.target.value))}
//             required
//           />
//         </label>
//         <label htmlFor="phone" className="flex flex-col gap-1">
//           <h2 className="text-[#eac158] pl-1 text-xl">Phone No.</h2>
//           <input
//             type="text"
//             className="p-4 rounded-xl border-2 border-[#eac158] bg-[#fbfada20] focus:bg-gray-100 transition-all outline-none text-white"
//             placeholder="Phone No."
//             value={Phone}
//             onChange={(e)=>(setPhone(e.target.value))}
//             required
//           />
//         </label>
//         <label htmlFor="address" className="flex flex-col gap-1">
//           <h2 className="text-[#eac158] pl-1 text-xl">Address</h2>
//           <input
//             type="text"
//             className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
//             placeholder="Address"
//             value={Address}
//             onChange={(e)=>(setAddress(e.target.value))}
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           onClick={(e)=>(handleSubmit(e))}
//           className="bg-orange-500 text-white font-medium py-4 px-8 rounded-full mt-4 opacity-90 hover:opacity-100"
//         >
//           Submit
//         </button>
//       </motion.form>
//     </div>
//   );
// }

// export default Signin;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function Signin({ close }) {
  const [Name, setName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const navigate=useNavigate()

  const handleClose = () => {
    close(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          username: Username,
          email: Email,
          password: Password,
          phoneno: Phone,
          address: Address,
          pic: "pic",
          
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      // Handle success response
      const data = await res.json();
      window.location.reload();
      console.log('Signup successful:', data);

    } catch (error) {
      console.error('Signup error:', error.message);
      // Handle and display the error to the user
    }
  };

  return (
    <div className="w-screen h-screen relative flex justify-center items-center my-6">
      <motion.form
        exit={{ opacity: 0, y: 100 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 10 }}
        className="w-1/2 p-4 bg-[#20201fdd] backdrop-blur-md shadow-xl drop-shadow-xl rounded-xl flex flex-col gap-4 bottom-2"
        onSubmit={handleSubmit} // Keep onSubmit event handler for the form
      >
        <div className="flex items-center justify-between">
          <h1 className="text-base font-medium text-center bg-orange-200 rounded-full py-2 px-4 w-fit">
            Sign Up
          </h1>
          <div onClick={handleClose}>
            <FaXmark className="text-3xl text-[#ff3333] cursor-pointer" />
          </div>
        </div>
        <label htmlFor="name" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Name</h2>
          <input
            type="text"
            id="name"
            className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
            placeholder="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="username" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Username</h2>
          <input
            type="text"
            id="username"
            className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Email</h2>
          <input
            type="email"
            id="email"
            className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Password</h2>
          <input
            type="password"
            id="password"
            className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="phone" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Phone No.</h2>
          <input
            type="text"
            id="phone"
            className="p-4 rounded-xl border-2 border-[#eac158] bg-[#fbfada20] focus:bg-gray-100 transition-all outline-none text-white"
            placeholder="Phone No."
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label htmlFor="address" className="flex flex-col gap-1">
          <h2 className="text-[#eac158] pl-1 text-xl">Address</h2>
          <input
            type="text"
            id="address"
            className="p-4 rounded-xl border-2 focus:bg-gray-100 transition-all border-[#eac158] bg-[#fbfada20] outline-none text-white"
            placeholder="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-orange-500 text-white font-medium py-4 px-8 rounded-full mt-4 opacity-90 hover:opacity-100"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
}

export default Signin;

import React, { useEffect, useRef, useState } from "react";
import {motion,useMotionTemplate,useMotionValue,animate,useScroll,useTransform,AnimatePresence,} from "framer-motion";
import "./App.css";
import scooter from "./asset/scooter.png";
import character1 from "./asset/ordering.png";
import search from "./asset/search.png";
import ch4 from "./asset/ch4.png";
import location from "./asset/location.png";
import Header from "./Pages/Header";
import MainCard from "./components/MainCard";
import ListedRestaurant from "./Pages/ListedRestaurant";
import { useDispatch } from "react-redux";
function App() {
  const [loc,setLocation]=useState('');
  const dispatch=useDispatch()
  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            setLocation(latitude+', '+longitude);
            // You can set the coordinates to state or perform other actions here
          },
          (error) => {
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []); 

  useEffect(() => {
    (
      async () => {
        const l = (await import("locomotive-scroll")).default;
        const LocotmotiveScroll = new l();
      }
    )()
  }, [])
  const COLORS = ["#FFDCAC", "#FDC287", "#FFE6C1", "#FBCF3D", "#FDCB87"];
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(40% 90% at 10% 5%, ${color} 1%, #FFF )`;
  const ref= useRef(null);
  const [sequence, setSequence] = React.useState(0);
  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSequence(1);
    }, 3000);
  }, []);
  const { scrollYProgress } = useScroll({
    target:ref,
  });
  const x = useTransform(scrollYProgress, [0,0.50], ["-50%", "-280%"]);
  const y = useTransform(scrollYProgress, [0, 0.50], ["-5rem", "15rem"]);
  const scale= useTransform(scrollYProgress, [0, 0.50], [1,0.5]);
  return (
    <>
      <Header/>
      <div ref={ref} className="w-screen h-[200vh]">
        <motion.div
          className="w-screen h-screen flex"
          style={{
            backgroundImage,
          }}
        >
          <div className="w-1/2 h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold text-slate-500 mt-11">We deliver the food you crave!</h1>
            <h2 className="text-2xl text-slate-500 mt-4">Order from your favourite restaurants & track on the go.</h2>
            <div className="w-full h-1/4  flex justify-evenly gap-4 mt-11">
              <div className="w-1/3 h-full bg-slate-50 rounded-md shadow-[inset_-12px_-8px_40px_#FFE9C1] flex flex-col justify-center items-center">
                <img/>
                <h1 className="text-2xl font-bold text-amber-400">300+ Reviews</h1>
                <h2 className="text-xl font-medium text-center text-slate-500">(4.3)</h2>
              </div>
              <div className="w-1/3 h-full bg-slate-50 rounded-md shadow-[inset_-12px_-8px_40px_#FFE9C1] flex flex-col justify-center items-center">
                <img/>
                <h1 className="text-2xl font-bold text-amber-400">100+</h1>
                <h2 className="text-xl font-medium text-center text-slate-500">Restaurants</h2>
              </div>
              <div className="w-1/3 h-full bg-slate-50 rounded-md shadow-[inset_-12px_-8px_40px_#FFE9C1] flex flex-col justify-center items-center">
                <img/>
                <h1 className="text-2xl font-bold text-amber-400">9000+</h1>
                <h2 className="text-xl font-medium text-center text-slate-500">Food Items</h2>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-screen flex justify-center items-end pb-10 relative">
            <div
              style={{ borderRadius: "68% 32% 57% 43% / 70% 58% 42% 30% " }}
              className=" w-[26vw] h-[30vw]  bg-gradient-to-b from-amber-500 to-amber-200/30"
            >
              <AnimatePresence>
                {sequence === 1 && (
                  <motion.img
                    initial={{x:'100%'}}
                    animate={{
                      x:'-50%',
                    }}
                    style={{ x,y,scale}}
                    transition={{
                      delay:0.2,
                      duration: 0.6,
                      
                    }}
                    src={scooter}
                    className="absolute  left-1/2 -translate-x-1/2  w-[40vw]"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {sequence === 0 && (
                  <motion.img
                    animate={{
                      scaleY: 1,
                    }}
                    initial={{
                      scaleY: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.85, 0, 0.15, 1],
                    }}
                    exit={{ opacity: 0 ,scaleY:0}}
                    src={character1}
                    className="absolute origin-bottom bottom-10 left-1/2 -translate-x-1/2  "
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        <div className="w-screen h-screen relative">
          <div className="w-full px-20 h-12 flex gap-3 justify-end relative">
            <div className="w-56 h-full rounded-lg flex gap-2">
              <div className="w-1/4 h-full bg-slate-100/10 rounded-lg flex justify-center items-center shadow-[inset_-12px_-8px_40px_#46464620]">
                <img src={location} className="w-10 h-10 object-contain mb-1 "/>
              </div>
                <input className="w-3/4 border-b-2 bg-transparent border-b-slate-200 focus:border-b-amber-400 outline-none px-3" value={loc} placeholder="location"/>
            </div>
            <div className=" w-1/3 h-full bg-slate-100/10 flex ring-2 ring-orange-200 rounded-lg shadow-lg shadow-orange-200 justify-center items-center px-2">
              <img src={search} className="w-8 h-8"/>
              <input type="text" placeholder="Search Food/Restaurants" className="w-full h-full bg-transparent outline-none px-4"/>
            </div>
            <img src={ch4} className="absolute w-20 -top-12 right-12"/>
          </div>
          <div className="w-full h-4/5 mt-5 pr-14 flex justify-around items-center">
                <motion.div 
                  data-scroll
                  data-scroll-speed="0.45"
                className="mt-10"><MainCard />
                </motion.div>
                <motion.div 
                  data-scroll
                  data-scroll-speed="0.25"
                  ><MainCard />
                </motion.div>
                <motion.div 
                  data-scroll
                  data-scroll-speed="0.35"
                className="mt-10"><MainCard />
                </motion.div>
          </div>
        </div>
        
      </div>
      <ListedRestaurant/>
    </>
  );
}

export default App;
